import type { ExecutionContext } from '@nestjs/common'
import { getRequest } from './get-request.util.js'

export function getLocale(context: ExecutionContext): string {
  const req = getRequest(context)

  const header = req.headers['accept-language']

if (typeof header === 'string') {
  return header.split(',')[0]
}

  return (
    req.cookies?.locale ??
    req.headers['accept-language']?.toString().split(',')[0] ??
    'en-US'
  )
}