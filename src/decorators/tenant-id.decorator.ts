// src/context/decorators/tenant-id.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ContextAccessor } from '../interceptor/context.store.js';

export const TenantId = createParamDecorator(
  (_data: unknown, _context: ExecutionContext): string | undefined => {
    return ContextAccessor.current()?.tenantId;
  },
);
