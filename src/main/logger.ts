import log from 'electron-log/main'

import { ENV } from './env'

import type { FormatParams } from 'electron-log'

console.log(ENV)

log.transports.console.format = ENV.VITE_LOGGER_CONSOLE_FORMAT

log.transports.file.format = ({ data, level }: FormatParams) => {
  const logRowObject = {
    time: new Date().getTime(),
    level,
    data,
  }

  const format = JSON.stringify(logRowObject)

  return [format]
}

export const logger = log
