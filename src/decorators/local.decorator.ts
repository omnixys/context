import { getLocale } from '../utils/get-locale.util.js';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const Local = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    return getLocale(context);
  },
);
