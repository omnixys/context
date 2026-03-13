import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { extractDevice } from '../utils/get-device.util.js'
import { getHeaders } from '../utils/get-headers.util.js';

export const Device = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    const headers = getHeaders(context);

        const uaHeader =
      headers['x-client-user-agent'] ??
      headers['x-forwarded-user-agent'] ??
      headers['user-agent']

          const userAgent =
      Array.isArray(uaHeader) ? uaHeader[0] : uaHeader
    

    return extractDevice(userAgent);
  },
)