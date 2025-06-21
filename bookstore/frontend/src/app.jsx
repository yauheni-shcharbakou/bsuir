import { observer } from 'mobx-react-lite'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './components/app/app.router'
import { useContext, useEffect } from 'react'
import { Context } from './store'
import { userApi } from './api'
import Nav from './components/nav'

export const App = observer(() => {
  const { user } = useContext(Context)
  const auth = () => {
    if (localStorage.getItem('user')) {
      userApi
        .auth()
        .then((response) => {
          user.setUser(response)
          user.setIsAuth(true)
        })
        .catch(() => {})
    }
  }

  useEffect(auth, [])
  useEffect(auth, [user.isAuth])

  return (
    <BrowserRouter>
      <Nav />
      <AppRouter />
    </BrowserRouter>
  )
})
