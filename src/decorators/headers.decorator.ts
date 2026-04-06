import { getHeaders } from '../utils/get-headers.util.js';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const RequestHeaders = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getHeaders(context);
  },
);
