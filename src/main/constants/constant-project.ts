import { is } from '@electron-toolkit/utils'

import { name, version } from '#/package'

/**
 * Наименование проекта
 */
export const PROJECT_NAME = name

/**
 * Наименование версии приложения
 */
export const PROJECT_VERSION = version

/**
 * Статус запуска проекта
 */
export const PROJECT_IS_DEV = is.dev
