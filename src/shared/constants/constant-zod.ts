import { z } from 'zod'

/**
 * ZOD-схема для переменных окружения
 */
export const ZOD_ENV = z.object({
  /**
   * Формат вывода логов в консоль
   */
  VITE_LOGGER_CONSOLE_FORMAT: z.preprocess(
    (value) => (value ? value : undefined),
    z.string().default('{d}.{m}.{y} {h}:{i}:{s} {level} : {text}').readonly(),
  ),
})
