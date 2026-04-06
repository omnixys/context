export function normalizeIp(ip: string): string {
  if (!ip) return 'unknown';

  // IPv6 localhost
  if (ip === '::1') return '127.0.0.1';

  // IPv4 mapped IPv6
  if (ip.startsWith('::ffff:')) {
    return ip.replace('::ffff:', '');
  }

  return ip;
}
