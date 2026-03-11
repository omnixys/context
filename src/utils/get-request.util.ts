import type { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { FastifyRequest } from 'fastify'
import type { GqlFastifyContext } from '../types/gql-context.js'

export function getRequest(context: ExecutionContext): FastifyRequest {
  const type = context.getType<string>()

  if (type === 'http') {
    return context.switchToHttp().getRequest<FastifyRequest>()
  }

  if (type === 'graphql') {
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext<GqlFastifyContext>()
    return ctx.req
  }

  throw new Error(`Unsupported context type: ${type}`)
}