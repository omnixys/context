import type { ExecutionContext } from '@nestjs/common'
import { getRequest } from './get-request.util.js'

export function getIp(context: ExecutionContext): string | undefined {
  const req = getRequest(context)

  const forwarded = req.headers['x-forwarded-for'] ??
      req.headers['x-real-ip'];

if (typeof forwarded === 'string') {
  return forwarded.split(',')[0].trim()
}

if (Array.isArray(forwarded)) {
  return forwarded[0]
}

  return (
    req.headers['cf-connecting-ip']?.toString() ||
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.ip ||
    req.socket?.remoteAddress
  )
}