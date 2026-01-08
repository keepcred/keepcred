import type { z } from 'zod'
import type { ZOD_AUTHORIZATION } from '../constants'

/**
 * Тип данных авторизации
 */
export type AuthorizationData = z.infer<typeof ZOD_AUTHORIZATION>
