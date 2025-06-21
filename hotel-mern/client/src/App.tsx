import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './components/app/AppRouter'
import { Nav } from './components/Nav'
import { ThemeProvider } from '@mui/material'
import theme from './shared/theme'
import { Context } from './store'
import { basketApi, orderApi, userApi } from './api'
import { Preloader } from './components/Preloader'
import { BasketPopulated } from './interfaces/populatedModels'
import { observer } from 'mobx-react-lite'

export const App: React.FC = observer(() => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('darkMode') !== 'false'
  )
  const currentTheme = theme(isDark)

  const [isLoading, setIsLoading] = useState(true)
  const { user, basket, order } = useContext(Context)

  const loadBasket = (callBack: (response: BasketPopulated) => void) => {
    basketApi
      .getOne(user.id)
      .then((response) => {
        basket.setBasket(response)
        callBack(response)
      })
      .catch((e) => console.error(e))
  }

  const loadOrders = (response: BasketPopulated) => {
    orderApi
      .get(response._id)
      .then((orders) => order.setOrders(orders))
      .catch((e) => console.error(e))
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userApi
        .auth()
        .then((response) => {
          user.setUser(response.user)
          user.setIsAuth(true)
          user.setId(response.id)

          loadBasket(loadOrders)
        })
        .catch(() => {})
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(
    () => localStorage.setItem('darkMode', JSON.stringify(isDark)),
    [isDark]
  )

  useEffect(() => {
    if (user.isAuth) loadBasket(loadOrders)
  }, [user.isAuth])

  if (isLoading) return <Preloader isDark={isDark} />

  return (
    <div className={isDark ? 'root' : 'root light'}>
      <ThemeProvider theme={currentTheme}>
        <BrowserRouter>
          <Nav toggleTheme={() => setIsDark((prev) => !prev)} />
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
})
