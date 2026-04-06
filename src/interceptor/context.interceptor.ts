// src/context/context.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Observable } from 'rxjs';

import { getHeaders } from '../utils/get-headers.util.js';
import { getIp } from '../utils/get-ip.util.js';
import { getRequest } from '../utils/get-request.util.js';

import { ContextAccessor } from './context.store.js';

function extractTenantFromHost(host?: string): string | undefined {
  if (!host) return undefined;

  // remove port
  const hostname = host.split(':')[0]; // localhost:7001 → localhost

  // localhost handling (DEV)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'omnixys'; // oder 'omnixys' fallback
  }

  const parts = hostname.split('.');

  // tenant1.app.com → tenant1
  if (parts.length >= 3) {
    return parts[0];
  }

  return undefined;
}


@Injectable()
export class ContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = getRequest(context);
    const headers = getHeaders(context);

    const user = req.user;

    // ─────────────────────────────────────────────
    // REQUEST ID
    // ─────────────────────────────────────────────
    const requestIdHeader = headers['x-request-id'];

    const requestId =
      typeof requestIdHeader === 'string'
        ? requestIdHeader
        : Array.isArray(requestIdHeader)
          ? requestIdHeader[0]
          : randomUUID();

    // ─────────────────────────────────────────────
    // USER AGENT
    // ─────────────────────────────────────────────
    const uaHeader =
      headers['x-client-user-agent'] ??
      headers['x-forwarded-user-agent'] ??
      headers['user-agent'];

    const userAgent = Array.isArray(uaHeader) ? uaHeader[0] : uaHeader;

    // ─────────────────────────────────────────────
    // TENANT RESOLUTION (IMPORTANT 🔥)
    // Priority:
    // 1. Header
    // 2. Domain
    // 3. Auth User
    // ─────────────────────────────────────────────

    const keycloakTenant = user?.raw.azp;

    const headerTenant =
      typeof headers['x-tenant-id'] === 'string'
        ? headers['x-tenant-id']
        : Array.isArray(headers['x-tenant-id'])
          ? headers['x-tenant-id'][0]
          : undefined;

const rawHost = Array.isArray(headers['host'])
  ? headers['host'][0]
  : headers['host'];

const domainTenant =
  typeof rawHost === 'string' ? extractTenantFromHost(rawHost) : undefined;
    const userTenant = user?.tenantId;

    // FINAL tenant
    const tenantId = keycloakTenant ?? headerTenant ?? domainTenant ?? userTenant;

    // ─────────────────────────────────────────────
    // CONTEXT
    // ─────────────────────────────────────────────
    const ctx = {
      actorId: user?.id,
      tenantId,
      requestId,
      ip: getIp(context),
      userAgent,
    };

    return ContextAccessor.run(ctx, () => next.handle());
  }
}
