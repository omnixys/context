import { UAParser } from 'ua-parser-js';

export function extractDevice(userAgent?: string) {
  if (!userAgent) return 'Unknown device';

  if (userAgent.includes('PostmanRuntime')) {
    return 'Postman client';
  }

  if (userAgent.includes('minipass-fetch')) {
    return 'Internal service';
  }

  const parser = new UAParser(userAgent);

  const browser = parser.getBrowser().name;
  const os = parser.getOS().name;
  const device = parser.getDevice().model;
  const type = parser.getDevice().type;

  if (device) {
    return `${device} (${browser ?? 'Unknown browser'} on ${os ?? 'Unknown OS'})`;
  }

  if (type === 'mobile') {
    return `Mobile (${browser ?? 'Unknown browser'} on ${os ?? 'Unknown OS'})`;
  }

  if (type === 'tablet') {
    return `Tablet (${browser ?? 'Unknown browser'} on ${os ?? 'Unknown OS'})`;
  }

  return `${browser ?? 'Unknown browser'} on ${os ?? 'Unknown OS'}`;
}
