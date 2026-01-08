import { LockOutlined, LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, FormRule, Input, message, Space, Tooltip } from 'antd'

import { AuthorizationData } from '#/shared/types/type-authorization'

import { AppForm } from '../components'
import { tRpcClient } from '../trpc'

/**
 * Страница авторизации приложения
 */
export const PageAuthorization = () => {
  const [form] = Form.useForm<AuthorizationData>()
  const [messageApi, messageHolder] = message.useMessage()

  const MIN_PASSWORD_LENGTH = 8

  const RULES_USERNAME: FormRule[] = [
    {
      required: true,
      message: 'Не был указан профиль',
    },
  ]

  const RULES_PASSWORD: FormRule[] = [
    {
      required: true,
      message: 'Не был указан мастер-пароль',
    },
    {
      min: MIN_PASSWORD_LENGTH,
      message: `Мастер-пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`,
    },
    {
      pattern: /[.,!-+=@#$%^&*()/\\]/,
      message: 'Мастер-пароль должен содержать хотя бы 1 специальный символ',
    },
    {
      pattern: /\d/,
      message: 'Мастер-пароль должен содержать хотя бы 1 цифру',
    },
    {
      pattern: /[A-Z]/,
      message: 'Мастер-пароль должен содержать хотя бы 1 символ в верхнем регистре',
    },
    {
      pattern: /[a-z]/,
      message: 'Мастер-пароль должен содержать хотя бы 1 символ в нижнем регистре',
    },
  ]

  const validateFormFields = async () => {
    let fieldsValue: AuthorizationData

    try {
      fieldsValue = await form.validateFields()

      return fieldsValue
    } catch (error) {
      const errors = form
        .getFieldsError()
        .map((error) => error.errors)
        .flat()

      messageApi.error(errors[0])
    }
  }

  const handleClickRegistrate = async () => {
    const fieldsValue = await validateFormFields()

    if (!fieldsValue) {
      return
    }

    try {
      await tRpcClient.authorization.register.query(fieldsValue)

      messageApi.success('Регистрация прошла успешно')
    } catch (error) {
      messageApi.error((error as Error).message)
    }
  }

  const handleClickAuthorize = async () => {
    const fieldsValue = await validateFormFields()

    if (!fieldsValue) {
      return
    }

    try {
      await tRpcClient.authorization.authorize.query(fieldsValue)

      messageApi.success('Авторизация прошла успешно')
    } catch (error) {
      messageApi.error((error as Error).message)
    }
  }

  return (
    <>
      {messageHolder}
      <AppForm title='Авторизация' form={form}>
        <Tooltip title='Укажите здесь название вашего профиля' placement='right'>
          <Space.Compact style={{ width: '100%' }}>
            <Space.Addon>
              <UserOutlined />
            </Space.Addon>
            <Form.Item name='username' style={{ width: '100%' }} rules={RULES_USERNAME} noStyle>
              <Input placeholder='Профиль' allowClear />
            </Form.Item>
          </Space.Compact>
        </Tooltip>
        <Tooltip title='Укажите здесь мастер-пароль для указанного профиля' placement='right'>
          <Space.Compact>
            <Space.Addon>
              <LockOutlined />
            </Space.Addon>
            <Form.Item name='password' style={{ width: '100%' }} rules={RULES_PASSWORD} noStyle>
              <Input.Password placeholder='Мастер-пароль' allowClear />
            </Form.Item>
          </Space.Compact>
        </Tooltip>
        <Form.Item noStyle>
          <Divider size='small' />
          <Tooltip title='Создать новый профиль по указанным данным' placement='right'>
            <Button type='primary' block icon={<UserAddOutlined />} onClick={handleClickRegistrate}>
              Создать
            </Button>
          </Tooltip>
          <Tooltip title='Войти в существующий профиль по указанным данным' placement='right'>
            <Button type='primary' block icon={<LoginOutlined />} onClick={handleClickAuthorize}>
              Войти
            </Button>
          </Tooltip>
        </Form.Item>
      </AppForm>
    </>
  )
}
