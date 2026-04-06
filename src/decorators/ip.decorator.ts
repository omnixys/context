import { getIp } from '../utils/get-ip.util.js';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const ClientIp = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    return getIp(context);
  },
);
