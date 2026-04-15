// src/context/decorators/tenant-id.decorator.ts

import { ContextAccessor } from '../interceptor/context.store.js';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantId = createParamDecorator(
  (_data: unknown, _context: ExecutionContext): string | undefined => {
    return ContextAccessor.current()?.tenantId;
  },
);
