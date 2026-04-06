import { IncomingHttpHeaders } from 'http';
import type { FastifyReply, FastifyRequest } from 'fastify';

export interface GqlFastifyContext {
  req: FastifyRequest;
  reply: FastifyReply;
}

export type OmnixysRequest = FastifyRequest & {
  headers: IncomingHttpHeaders;
  ip?: string;
  socket?: {
    remoteAddress?: string;
  };
  userAgent?: string;
};
