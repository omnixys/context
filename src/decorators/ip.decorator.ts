import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { getIp } from '../utils/get-ip.util.js'

export const ClientIp = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    return getIp(context)
  },
)