import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { getHeaders } from '../utils/get-headers.util.js'
import { parseClientInfo } from '../utils/parse-client-info.util.js'
import type { ClientInfo as ClientInfoType } from '@omnixys/contracts'
import { getLocale } from '../utils/get-locale.util.js'
import { getIp } from '../utils/get-ip.util.js'
import geoip from 'geoip-lite';

export const ClientInfo = createParamDecorator(
  (_data: unknown, context: ExecutionContext): ClientInfoType => {

    const headers = getHeaders(context)

    const uaHeader =
      headers['x-client-user-agent'] ??
      headers['x-forwarded-user-agent'] ??
      headers['user-agent']

    const userAgent =
      Array.isArray(uaHeader) ? uaHeader[0] : uaHeader


      const locale = getLocale(context)

          const ipAddress = getIp(context);
          const geo = ipAddress ? geoip.lookup(ipAddress) : null;
          const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown location';
  

    return parseClientInfo(locale, location, userAgent, ipAddress)
  },
)