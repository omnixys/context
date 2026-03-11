import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { getResponse } from '../utils/get-response.util.js'

export const ResponseContext = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getResponse(context)
  },
)