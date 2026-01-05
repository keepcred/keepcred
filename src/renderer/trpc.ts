import { createTRPCReact } from '@trpc/react-query'
import { createTRPCClient } from '@trpc/client'
import { ipcLink } from 'trpc-electron/renderer'

import type { tRpcRouter } from '#/shared'

/**
 * Клиент tRPC
 */
export const tRpcClient = createTRPCClient<tRpcRouter>({
  links: [ipcLink()],
})

/**
 * Клиент tRPC React
 */
export const tRpcClientReact = createTRPCReact<tRpcRouter>()
