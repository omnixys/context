import { getResponse } from '../utils/get-response.util.js';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const ResponseContext = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getResponse(context);
  },
);
