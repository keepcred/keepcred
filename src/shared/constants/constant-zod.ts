import { z } from 'zod'

/**
 * Создает схему для числовой переменной окружения.
 *
 * @param _default - (Опционально) Значение по умолчанию.
 *
 * @returns Схема числовой переменной окружения.
 */
const ZOD_ENV_OPTIONAL_READONLY_NUMBER = (_default?: number) =>
  _default ? z.coerce.number().int().positive().default(_default).readonly() : z.preprocess((value) => value ? value : undefined, z.number().optional().readonly())

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
  /**
   * Минимальная ширина окна Electron приложения
   */
  VITE_ELECTRON_WINDOW_MIN_WIDTH: ZOD_ENV_OPTIONAL_READONLY_NUMBER(900),
  /**
   * Минимальная высота окна Electron приложения
   */
  VITE_ELECTRON_WINDOW_MIN_HEIGHT: ZOD_ENV_OPTIONAL_READONLY_NUMBER(670),
  /**
   * Максимальная ширина окна Electron приложения
   */
  VITE_ELECTRON_WINDOW_MAX_WIDTH: ZOD_ENV_OPTIONAL_READONLY_NUMBER(),
  /**
   * Максимальная высота окна Electron приложения
   */
  VITE_ELECTRON_WINDOW_MAX_HEIGHT: ZOD_ENV_OPTIONAL_READONLY_NUMBER(),
  /**
   * Ширина по умолчанию окна Electron приложения
   */
  VITE_ELECTRON_WINDOW_DEFAULT_WIDTH: ZOD_ENV_OPTIONAL_READONLY_NUMBER(900),
  /**
   * Высота по умолчанию окна Electron приложения
   */
  VITE_ELECTRON_WINDOW_DEFAULT_HEIGHT: ZOD_ENV_OPTIONAL_READONLY_NUMBER(670),
  /**
   * Путь до файла БД
   */
  VITE_DATABASE_URL: z.preprocess((value) => value ? value : undefined, z.string().optional().default('file:./dev.db').readonly()),
  /**
   * Ссылка на рендер
   */
  ELECTRON_RENDERER_URL: z.string().optional(),
})

/**
 * Zod схема авторизации
 */
export const ZOD_AUTHORIZATION = z.object({
  /**
   * Наименование пользователя
   */
  username: z.string(),
  /**
   * Мастер-пароль пользователя
   */
  password: z.string(),
})
