import { getRequest } from '../utils/get-request.util.js';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const Req = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getRequest(context);
  },
);
