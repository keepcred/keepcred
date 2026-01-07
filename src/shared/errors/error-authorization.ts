import { ErrorBase } from './error-base'

/**
 * Класс ошибок авторизации
 */
export class ErrorAuthorization extends ErrorBase {
  /**
   * Наименование пользовательского имени
   */
  readonly username: string

  /**
   * Конструктор класса ошибок авторизации
   *
   * @param message Сообщение
   * @param username Наименование профиля
   */
  constructor(message: string, username: string) {
    super(message)

    this.username = username
  }
}
