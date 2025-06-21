import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../store'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { RoutePath } from '../shared/constants'

const Nav = observer(() => {
  const { user } = useContext(Context)
  const { pathname } = useLocation()
  const { push } = useHistory()
  const isAuthPage =
    pathname === RoutePath.Login || pathname === RoutePath.Register

  const logout = (event) => {
    event.preventDefault()
    user.setUser({})
    user.setIsAuth(false)
    localStorage.removeItem('user')
    push(RoutePath.Main)
  }

  return (
    <nav className="nav">
      <div className="nav-wrapper">
        <NavLink className="brand-logo" to={RoutePath.Main}>
          Букинистический магазин
        </NavLink>
        <ul id="nav-mobile" className="right">
          {user.user.role === 'admin' && (
            <li>
              <NavLink to={RoutePath.Admin}>Администрирование</NavLink>
            </li>
          )}

          {(user.user.role === 'salesman' || user.user.role === 'admin') && (
            <li>
              <NavLink to={RoutePath.Offer}>Мои предложения</NavLink>
            </li>
          )}

          {user.isAuth && (
            <>
              <li>
                <NavLink to={RoutePath.Order}>Мои заказы</NavLink>
              </li>
              <li>
                <NavLink to={RoutePath.Favorite}>Избранное</NavLink>
              </li>
              <li>
                <a href="/" onClick={logout}>
                  Выйти
                </a>
              </li>
            </>
          )}

          {!user.isAuth && !isAuthPage && (
            <>
              <li>
                <NavLink to={RoutePath.Register}>Регистрация</NavLink>
              </li>
              <li>
                <NavLink to={RoutePath.Login}>Вход</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
})

export default Nav
