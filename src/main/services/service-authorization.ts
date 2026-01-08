import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

import { KEY_LENGTH, SALT_LENGTH } from '../constants'

/**
 * Сервис авторизации
 */
export abstract class ServiceAuthorization {
  /**
   * Сервис хэширования пароля
   *
   * @param password Пароль
   *
   * @returns Хэш и соль пароля
   */
  static hashPassword(password: string) {
    const salt = randomBytes(SALT_LENGTH).toString('hex')
    const hashBuffer = scryptSync(password, salt, KEY_LENGTH)

    return {
      salt,
      hash: hashBuffer.toString('hex'),
    }
  }

  /**
   * Сервис верификации паролей
   *
   * @param password Пароль
   * @param storedHash Хранимый хэш
   * @param storedSalt Хранимая соль
   *
   * @returns Флаг верификации пароля
   */
  static verifyPassword(password: string, storedHash: string, storedSalt: string) {
    const storedHashBuffer = Buffer.from(storedHash, 'hex')
    const derivedHashBuffer = scryptSync(password, storedSalt, KEY_LENGTH)

    return timingSafeEqual(storedHashBuffer, derivedHashBuffer)
  }
}
