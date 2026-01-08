import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import { RoutePath } from '#/shared/enums/enum-route-path'

import { LayoutApp } from '../layouts'
import { PageAuthorization } from '../pages'

/**
 * Компонент навигации приложения
 */
export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<LayoutApp />}>
          <Route path={RoutePath.HOST} element={<Navigate to={RoutePath.AUTHORIZATION} replace />} />
          <Route path={RoutePath.AUTHORIZATION} index element={<PageAuthorization />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
