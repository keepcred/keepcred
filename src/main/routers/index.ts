import { router } from "../trpc";

import { routerApp } from "./router-app";

/**
 * Маршрутизатор tRPC
 */
export const routerTRpc = router({
  app: routerApp
})
