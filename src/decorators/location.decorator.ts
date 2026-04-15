import { getIp } from '../utils/get-ip.util.js';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import geoip from 'geoip-lite';

export const Location = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    const ipAddress = getIp(context);
    const geo =
      ipAddress === '127.0.0.1'
        ? geoip.lookup('89.244.123.45')
        : ipAddress
          ? geoip.lookup(ipAddress)
          : null;
    const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown location';

    // const headers = getHeaders(context);
    // const userAgent = headers['user-agent'];
    return location;
  },
);
