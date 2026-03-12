import type { FastifyReply } from "fastify"
import { cookieOpts } from "./get-cookies.util.js"
import { accessToken, refreshToken } from "../const/cookie.const.js"

/**
 * Safely sets a cookie on the response if available.
 *
 * @param res - Express response object.
 * @param name - The cookie name.
 * @param value - The cookie value.
 * @param opts - Additional cookie options.
 */
export function gqlSetCookieSafe(
  reply: FastifyReply,
  name: string,
  value: string,
  maxAgeMs?: number,
): void {
  reply.setCookie(name, value, cookieOpts(maxAgeMs))
}

/**
 * Safely clears a cookie from the response if available.
 *
 * @param res - Express response object.
 * @param name - The cookie name to remove.
 */
export function gqlClearCookieSafe(
  reply: FastifyReply,
  name: string,
): void {
  reply.clearCookie(name, cookieOpts())
}


export function gqlSetTokens(  
  reply: FastifyReply,
  value: string,
  maxAgeMs?: number,
) {
  gqlSetCookieSafe(
      reply,
      accessToken,
      value,
      maxAgeMs,
    );

    gqlSetCookieSafe(
      reply,
      refreshToken,
      value,
      maxAgeMs,
    );
}

export function gqlClearTokens(  
  reply: FastifyReply,
) {
  gqlClearCookieSafe(reply, accessToken);
  gqlClearCookieSafe(reply, refreshToken);
}