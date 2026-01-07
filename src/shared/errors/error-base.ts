/**
 * Класс ошибок приложения
 */
export class ErrorBase extends Error {
  /**
   * Конструктор ошибок приложения
   *
   * @param message Сообщение
   */
  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)

    Error.captureStackTrace(this)
  }
}
