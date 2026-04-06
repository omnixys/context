import { getCookies } from '../utils/get-cookies.util.js';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

export const RequestCookies = createParamDecorator(
  (_data: unknown, context: ExecutionContext): FastifyRequest['cookies'] => {
    return getCookies(context);
  },
);
