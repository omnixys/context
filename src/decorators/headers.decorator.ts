import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { getHeaders } from '../utils/get-headers.util.js'

export const RequestHeaders = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getHeaders(context)
  },
)