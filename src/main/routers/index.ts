import { router } from '../trpc'

import { routerApp } from './router-app'
import { routerAuthorization } from './router-authorization'

/**
 * Маршрутизатор tRPC
 */
export const routerTRpc = router({
  app: routerApp,
  authorization: routerAuthorization,
})
