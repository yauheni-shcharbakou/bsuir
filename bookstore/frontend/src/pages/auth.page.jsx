import React, { useContext, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { RoutePath } from '../shared/constants'
import { Context } from '../store'
import { userApi } from '../api'

const AuthPage = () => {
  const { pathname } = useLocation()
  const isRegister = pathname === RoutePath.Register
  const { user } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSalesman, setIsSalesman] = useState(false)
  const { push } = useHistory()

  const submitHandler = async () => {
    try {
      const response = isRegister
        ? await userApi.register(email, password, isSalesman)
        : await userApi.login(email, password)

      user.setUser(response)
      user.setIsAuth(true)
      push(RoutePath.Main)
    } catch (e) {
      alert(e.response.data.message || 'Ошибка')
    }
  }

  return (
    <div className="content">
      <div className="form">
        <label>
          <input
            type="text"
            placeholder="E-mail"
            required
            onInput={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Пароль"
            autoComplete="off"
            required
            onInput={(e) => setPassword(e.target.value)}
          />
        </label>

        {isRegister && (
          <label>
            <input type="checkbox" onChange={(e) => setIsSalesman(e.target.checked)} />
            <span>Я продавец</span>
          </label>
        )}

        <p>
          <NavLink to={isRegister ? RoutePath.Login : RoutePath.Register}>
            Нажмите для {isRegister ? 'входа' : 'регистрации'}
          </NavLink>
        </p>
        <button className="btn" onClick={submitHandler}>
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </div>
    </div>
  )
}

export default AuthPage
