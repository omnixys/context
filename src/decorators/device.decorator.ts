import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { extractDevice } from '../utils/get-device.util.js'
import { getHeaders } from '../utils/get-headers.util.js';

export const Device = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    const headers = getHeaders(context);
     const userAgent = headers['user-agent'];
    return extractDevice(userAgent);
  },
)