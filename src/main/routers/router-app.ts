import { procedure, router } from "../trpc";

/**
 * Роутер приложения
 */
export const routerApp = router({
  /**
   * Проверка работоспособности приложения
   */
  healthCheck: procedure.query(() => true)
})
