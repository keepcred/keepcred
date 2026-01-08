import { App as AntdApp, ConfigProvider as AntdConfigProvider } from 'antd'
import { useSignals, useSignal } from '@preact/signals-react/runtime'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import './styles/sass/index.sass'
import { tRpcClient, tRpcClientReact } from './trpc'
import { AppRouter } from './routers'

/**
 * Компонент приложения
 */
export const App = () => {
  useSignals()

  const client = useSignal(tRpcClient)
  const clientTanstack = useSignal(new QueryClient())

  return (
    <>
      <tRpcClientReact.Provider client={client.value} queryClient={clientTanstack.value}>
        <QueryClientProvider client={clientTanstack.value}>
          <AntdConfigProvider>
            <AntdApp style={{ height: '100%' }}>
              <AppRouter />
            </AntdApp>
          </AntdConfigProvider>
        </QueryClientProvider>
      </tRpcClientReact.Provider>
    </>
  )
}
