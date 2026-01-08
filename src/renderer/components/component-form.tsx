import { Card, Flex, Form, FormInstance } from 'antd'

/**
 * Пропсы компонента формы приложения
 */
export type AppFormProps = React.PropsWithChildren<{
  /**
   * Заголовок
   */
  title?: string
  /**
   * Инстанс формы
   */
  form: FormInstance
}>

/**
 * Компонент формы
 *
 * @param props Пропсы
 */
export const AppForm = (props: AppFormProps) => {
  const { title, form, children } = props

  return (
    <Card title={title} style={{ textAlign: 'center' }}>
      <Form form={form}>
        <Flex vertical justify='start' align='center' gap={16}>
          {children}
        </Flex>
      </Form>
    </Card>
  )
}
