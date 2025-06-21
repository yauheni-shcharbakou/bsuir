import React, { useContext } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { Context } from '../../store'
import { RoutePath } from '../../shared/constants'
import { adminRoutes, authRoutes, publicRoutes } from '../../shared/routes'
import { observer } from 'mobx-react-lite'

export const AppRouter = observer(() => {
  const { user } = useContext(Context)

  return (
    <Switch>
      {user.isAuth &&
        user.user.role === 'admin' &&
        adminRoutes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} exact />
        ))}

      {user.isAuth &&
        authRoutes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} exact />
        ))}

      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}

      <Redirect to={RoutePath.Main} />
    </Switch>
  )
})
