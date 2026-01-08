import { ZOD_AUTHORIZATION, ErrorAuthorization } from '#/shared'

import { PRISMA } from '../prisma'
import { procedure, router } from '../trpc'
import { ServiceAuthorization, ServiceCrypto } from '../services'
import { logger } from '../logger'

export let memoryDek: Buffer | null = null

/**
 * Роутер tRPC авторизации
 */
export const routerAuthorization = router({
  /**
   * Создание нового профиля
   */
  register: procedure.input(ZOD_AUTHORIZATION).query(async (request) => {
    const { username, password } = request.input

    let profileIsExisted: Awaited<ReturnType<typeof PRISMA.profile.findFirst>>

    try {
      profileIsExisted = await PRISMA.profile.findFirst({
        where: {
          username,
        },
      })
    } catch (error) {
      logger.error(error)

      throw new ErrorAuthorization('Критическая ошибка: не удалось обратиться к БД', username)
    }

    if (profileIsExisted) {
      throw new ErrorAuthorization('Профиль с таким именем уже существует', username)
    }

    const passwordHash = ServiceAuthorization.hashPassword(password)
    const rawDEK = ServiceCrypto.generateRandomKey()
    const kekSalt = ServiceCrypto.generateSalt()
    const kek = ServiceCrypto.deriveKeyFromPassword(password, kekSalt)
    const encryptedDek = ServiceCrypto.encrypt(rawDEK, kek)

    try {
      await PRISMA.profile.create({
        data: {
          username,
          passwordHash: passwordHash.hash,
          passwordSalt: passwordHash.salt,
          kekSalt,
          dekIv: encryptedDek.iv,
          dekTag: encryptedDek.tag,
          dekContent: encryptedDek.content,
        },
      })
    } catch (error) {
      logger.error(error)

      throw new ErrorAuthorization('Критическая ошибка: не удалось сохранить данные авторизации в БД', username)
    }

    memoryDek = rawDEK

    return true
  }),
  /**
   * Авторизация профиля
   */
  authorize: procedure.input(ZOD_AUTHORIZATION).query(async (request) => {
    const { username, password } = request.input

    const profile = await PRISMA.profile.findFirst({
      where: {
        username,
      },
    })

    if (!profile) {
      throw new ErrorAuthorization(`Профиля с названием ${username} не существует`, username)
    }

    const isCompareTrue = ServiceAuthorization.verifyPassword(password, profile.passwordHash, profile.passwordSalt)

    if (!isCompareTrue) {
      throw new ErrorAuthorization(`Указан неверный пароль`, username)
    }

    try {
      const kek = ServiceCrypto.deriveKeyFromPassword(password, profile.kekSalt)
      const dekBuffer = ServiceCrypto.decrypt(
        {
          iv: profile.dekIv,
          tag: profile.dekTag,
          content: profile.dekContent,
        },
        kek,
      )

      memoryDek = dekBuffer
    } catch (error) {
      logger.error(error)

      throw new ErrorAuthorization('Критическая ошибка: не удалось расшифровать мастер-ключ', username)
    }

    return true
  }),
})
