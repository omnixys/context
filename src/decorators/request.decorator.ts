import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { getRequest } from '../utils/get-request.util.js'

export const Req = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getRequest(context)
  },
)