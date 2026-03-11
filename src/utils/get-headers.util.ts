import type { ExecutionContext } from '@nestjs/common'
import { getRequest } from './get-request.util.js'
import type { FastifyRequest } from 'fastify'

export function getHeaders(context: ExecutionContext): FastifyRequest['headers'] {
  const req = getRequest(context)
  return req.headers
}