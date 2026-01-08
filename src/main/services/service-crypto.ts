import { pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv } from 'node:crypto'

import { ALGORITHM, FORMAT_HEX, IV_LENGTH, KDF_DIGEST, KDF_ITERATIONS, KEY_LENGTH, SALT_LENGTH } from '../constants'

/**
 * Зашифрованный контейнер
 */
type EncryptedContainer = {
  /**
   * iv
   */
  iv: string
  /**
   * Тег целостности данных
   */
  tag: string
  /**
   * Контент
   */
  content: string
}

export abstract class ServiceCrypto {
  /**
   * Метод генерации соли
   *
   * @returns Соль
   */
  static generateSalt() {
    return randomBytes(SALT_LENGTH).toString(FORMAT_HEX)
  }

  /**
   * Метод генерации случайного ключа DEK
   *
   * @returns DEK
   */
  static generateRandomKey(): Buffer {
    return randomBytes(KEY_LENGTH)
  }

  /**
   * Метод преобразования пароля в KEK
   *
   * @param password Пароль
   * @param saltHex Соль в HEX
   *
   * @returns KEK
   */
  static deriveKeyFromPassword(password: string, saltHex: string) {
    return pbkdf2Sync(password, Buffer.from(saltHex, FORMAT_HEX), KDF_ITERATIONS, KEY_LENGTH, KDF_DIGEST)
  }

  /**
   * Метод шифрования данных
   *
   * @param data Данные
   * @param dekKey DEK
   *
   * @returns Зашифрованный контейнер
   */
  static encrypt(data: string | Buffer, dekKey: Buffer) {
    const iv = randomBytes(IV_LENGTH)
    const chiper = createCipheriv(ALGORITHM, dekKey, iv)

    let encrypted = Buffer.isBuffer(data) ? chiper.update(data) : chiper.update(data, 'utf8')

    encrypted = Buffer.concat([encrypted, chiper.final()])

    return {
      iv: iv.toString(FORMAT_HEX),
      tag: chiper.getAuthTag().toString(FORMAT_HEX),
      content: encrypted.toString(FORMAT_HEX),
    }
  }

  /**
   * Метод расшифровки данных
   *
   * @param container Зашифрованный контейнер
   * @param dekKey DEK
   *
   * @returns Расшифрованные данные
   */
  static decrypt(container: EncryptedContainer, dekKey: Buffer) {
    const iv = Buffer.from(container.iv, FORMAT_HEX)
    const tag = Buffer.from(container.tag, FORMAT_HEX)
    const content = Buffer.from(container.content, FORMAT_HEX)
    const decipher = createDecipheriv(ALGORITHM, dekKey, iv)

    decipher.setAuthTag(tag)

    let decrypted = decipher.update(content)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted
  }
}
