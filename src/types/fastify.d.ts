import type { OmnixysCookieRequest, AuthUser } from '@omnixys/shared';
import '@fastify/cookie';
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser;

    cookies: OmnixysCookieRequest & {
      [key: string]: string | undefined;
    };
  }
}
