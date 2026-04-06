export interface RequestContext {
  actorId?: string;
  tenantId?: string;
  requestId?: string;
  ip?: string;
  userAgent?: string;
}
