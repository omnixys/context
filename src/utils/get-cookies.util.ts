import type { ExecutionContext } from '@nestjs/common'
import type { FastifyReply, FastifyRequest } from 'fastify'
import process from 'node:process'

import { getRequest } from './get-request.util.js'
import { getResponse } from './get-response.util.js'

const isProd = process.env.NODE_ENV === 'production'

export function getCookies(context: ExecutionContext): FastifyRequest['cookies']  {
  const req = getRequest(context)
  return req.cookies ?? {}
}

/**
 * Creates a configured set of cookie options based on the runtime environment.
 *
 * @param maxAgeMs - The cookie lifetime in milliseconds.
 * @returns Express-compatible {@link CookieOptions}.
 */
export const cookieOpts = (maxAgeMs?: number) => ({
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax' as CookieSameSite,
  domain: isProd ? '.omnixys.com' : undefined,
  path: '/',
  maxAge: maxAgeMs,
})

/**
 * Safely sets a cookie on the response if available.
 *
 * @param res - Express response object.
 * @param name - The cookie name.
 * @param value - The cookie value.
 * @param opts - Additional cookie options.
 */
export function setCookieSafe(
  context: ExecutionContext,
  name: string,
  value: string,
  maxAgeMs?: number,
): void {
  const reply = getResponse(context) as FastifyReply

  if (!reply) return

  reply.setCookie(name, value, cookieOpts(maxAgeMs))
}

/**
 * Safely clears a cookie from the response if available.
 *
 * @param res - Express response object.
 * @param name - The cookie name to remove.
 */
export function clearCookieSafe(
  context: ExecutionContext,
  name: string,
): void {
  const reply = getResponse(context) as FastifyReply

  if (!reply) return

  reply.clearCookie(name, cookieOpts())
}


export function setTokens(  
  context: ExecutionContext,
  value: string,
  maxAgeMs?: number,
) {
  setCookieSafe(
      context,
      'access_token',
      value,
      maxAgeMs,
    );

    setCookieSafe(
      context,
      'refresh_token',
      value,
      maxAgeMs,
    );
}