import type { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { FastifyReply } from 'fastify'
import type { GqlFastifyContext } from '../types/gql-context.js'

export function getResponse(context: ExecutionContext): FastifyReply {
  const type = context.getType<string>()

  if (type === 'http') {
    return context.switchToHttp().getResponse<FastifyReply>()
  }

  if (type === 'graphql') {
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext<GqlFastifyContext>()
    return ctx.res
  }

  throw new Error(`Unsupported context type: ${type}`)
}