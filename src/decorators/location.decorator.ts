import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { getIp } from '../utils/get-ip.util.js';
import geoip from 'geoip-lite';


export const Location = createParamDecorator(
  (_data: unknown, context: ExecutionContext): string | undefined => {
    const ipAddress = getIp(context);
    const geo = ipAddress ? geoip.lookup(ipAddress) : null;
    const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown location';

    // const headers = getHeaders(context);
    // const userAgent = headers['user-agent'];
    return location;
  },
)