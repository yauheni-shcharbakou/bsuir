import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../../shared/routes'
import { Context } from '../../store'
import { paths } from '../../shared/enums'

export const AppRouter: React.FC = () => {
  const { user } = useContext(Context)

  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} exact />
        ))}

      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} exact />
      ))}

      <Redirect to={paths.main} />
    </Switch>
  )
}
