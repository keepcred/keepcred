import { join } from 'path'

import { app } from 'electron'

import { ENV } from '../env'

import { PROJECT_IS_DEV } from './constant-project'

/**
 * Путь до папки пользовательских данных
 */
const PATH_DIRECTORY_USER_DATA = app.getPath('userData')

/**
 * Путь до директории приложения
 */
export const PATH_DIRECTORY_APP = PATH_DIRECTORY_USER_DATA

/**
 * Путь до файла БД приложения
 */
export const PATH_FILE_APP_DATABASE = PROJECT_IS_DEV ? ENV.VITE_DATABASE_URL : join(PATH_DIRECTORY_APP, 'database.db')
