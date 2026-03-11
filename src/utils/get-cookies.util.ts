import type { ExecutionContext } from '@nestjs/common'
import { getRequest } from './get-request.util.js'
import type { FastifyRequest } from 'fastify'

export function getCookies(context: ExecutionContext): FastifyRequest['cookies']  {
  const req = getRequest(context)
  return req.cookies ?? {}
}