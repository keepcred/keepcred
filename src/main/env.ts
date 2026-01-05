import { z } from 'zod'

import { ZOD_ENV } from '../shared'

const INITIAL_ENV = { ...process.env, ...import.meta.env }

const ENV_PARSE_RESULT = ZOD_ENV.safeParse(INITIAL_ENV)

if (!ENV_PARSE_RESULT.success) {
  throw new Error(`Ошибка валидации переменных окружения:\n\n${ENV_PARSE_RESULT.error}\n\n${z.treeifyError(ENV_PARSE_RESULT.error)}`)
}

export const ENV = ENV_PARSE_RESULT.data
