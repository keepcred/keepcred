import Database from 'better-sqlite3'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

import { PrismaClient } from '../generated/prisma/client'

import { PATH_FILE_APP_DATABASE } from './constants'
import { logger } from './logger'

logger.debug(`Изначальный путь до файла БД: ${PATH_FILE_APP_DATABASE}`)

const PATH_FILE_APP_DATABASE_HANDLE = PATH_FILE_APP_DATABASE.replace('file:', '')

let db: InstanceType<typeof Database>

try {
  logger.debug(`Обработанный путь до файла БД: ${PATH_FILE_APP_DATABASE_HANDLE}`)

  db = new Database(PATH_FILE_APP_DATABASE_HANDLE)

  logger.debug('Создан экземпляр БД')
} catch (error) {
  logger.error(`Не удалось создать экземпляр БД:\n\n${error}`)

  throw new Error('Не удалось создать экземпляр БД!')
}

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

logger.debug('Настроены параметры БД')

const PRISMA_BETTER_SQLITE_3_ADAPTER = new PrismaBetterSqlite3({ url: PATH_FILE_APP_DATABASE_HANDLE })

const PRISMA = new PrismaClient({ adapter: PRISMA_BETTER_SQLITE_3_ADAPTER })

export { PRISMA }
