import type { Config } from 'prettier'

/**
 * Конфигурация Prettier
 */
const config: Config = {
  semi: false,
  endOfLine: 'lf',
  printWidth: 130,
  quoteProps: 'consistent',
  singleQuote: true,
  jsxSingleQuote: true,
}

export default config
