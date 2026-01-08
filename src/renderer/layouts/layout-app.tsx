import { Flex, Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'

/**
 * Компонент разметки приложения
 */
export const LayoutApp = () => {
  const { token } = theme.useToken()
  const { colorBgLayout: bgColor } = token

  return (
    <Layout style={{ height: '100%', backgroundColor: bgColor }}>
      <Layout.Content style={{ maxHeight: '100%', maxWidth: '100%' }}>
        <Flex justify='center' align='center' style={{ height: '100%' }}>
          <Outlet />
        </Flex>
      </Layout.Content>
    </Layout>
  )
}
