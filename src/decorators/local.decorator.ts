import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { getLocale } from '../utils/get-locale.util.js';


export const Local = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    return getLocale(context);
  },
)