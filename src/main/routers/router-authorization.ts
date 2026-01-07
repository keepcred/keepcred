import { hashSync, compareSync } from 'bcryptjs'

import { ZOD_AUTHORIZATION, ErrorAuthorization } from '#/shared'

import { PRISMA } from '../prisma'
import { procedure, router } from '../trpc'

/**
 * Роутер tRPC авторизации
 */
export const routerAuthorization = router({
  /**
   * Создание нового профиля
   */
  newProfile: procedure.input(ZOD_AUTHORIZATION).query(async (request) => {
    const { username, password } = request.input

    const isUsernameExists = await PRISMA.profile.findFirst({
      where: {
        username,
      },
    })

    if (isUsernameExists) {
      throw new ErrorAuthorization('Пользователь с таким именем уже существует', username)
    }

    await PRISMA.profile.create({
      data: {
        username,
        password: hashSync(password, 12)
      },
    })

    return true
  }),
  /**
   * Авторизация профиля
   */
  authorize: procedure.input(ZOD_AUTHORIZATION).query(async (request) => {
    const { username, password } = request.input

    const profile = await PRISMA.profile.findFirst({
      where: {
        username
      }
    })

    if (!profile) {
      throw new ErrorAuthorization(`Профиля с названием ${username} не существует`, username)
    }

    const isCompareTrue = compareSync(password, profile.password)

    if (!isCompareTrue) {
      throw new ErrorAuthorization(`Указан неверный пароль`, username)
    }

    return true
  })
})
