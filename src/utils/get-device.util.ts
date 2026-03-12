import { UAParser } from 'ua-parser-js';

export function extractDevice(userAgent?: string) {
  if (!userAgent) return 'Unknown device';

  if (userAgent.includes('PostmanRuntime')) {
    return 'Postman client';
  }

  const parser = new UAParser(userAgent);

  const browser = parser.getBrowser().name ?? 'Unknown browser';
  const os = parser.getOS().name ?? 'Unknown OS';

  return `${browser} on ${os}`;
}

