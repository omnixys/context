import { RequestContext } from '../types/context.types.js';
import { AsyncLocalStorage } from 'node:async_hooks';

export const contextStorage = new AsyncLocalStorage<RequestContext>();

export class ContextAccessor {
  static current(): RequestContext | undefined {
    return contextStorage.getStore();
  }

  static run<T>(ctx: RequestContext, fn: () => T): T {
    return contextStorage.run(ctx, fn);
  }
}
