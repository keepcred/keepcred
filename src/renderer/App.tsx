import { useSignals, useSignal } from '@preact/signals-react/runtime'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { tRpcClient, tRpcClientReact } from './trpc'

export const App = () => {
  useSignals()

  const client = useSignal(tRpcClient)
  const clientTanstack = useSignal(new QueryClient())

  return (
    <>
      <tRpcClientReact.Provider client={client.value} queryClient={clientTanstack.value}>
        <QueryClientProvider client={clientTanstack.value}></QueryClientProvider>
      </tRpcClientReact.Provider>
    </>
  )
}
