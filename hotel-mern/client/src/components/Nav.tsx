import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Context } from '../store'
import { observer } from 'mobx-react-lite'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { useTheme } from '@mui/material'
import { NavProps } from '../interfaces/props'
import { User } from '../interfaces/models'
import { paths } from '../shared/enums'

export const Nav: React.FC<NavProps> = observer(({ toggleTheme }) => {
  const { user } = useContext(Context)
  const { pathname } = useLocation()
  const isAuthPage = pathname === paths.login || pathname === paths.register
  const { palette } = useTheme()
  const { push } = useHistory()

  const logout = () => {
    push(paths.main)
    user.setUser({} as User)
    user.setIsAuth(false)
    user.setId('')
    localStorage.removeItem('token')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to={paths.main}>Hotel app</NavLink>
            <Button
              variant="text"
              color="inherit"
              sx={{ mx: 1 }}
              onClick={() => toggleTheme()}
            >
              {palette.mode === 'dark' ? (
                <DarkModeRoundedIcon />
              ) : (
                <LightModeRoundedIcon />
              )}
            </Button>
          </Typography>

          {user.isAuth && user.user.role === 'admin' && (
            <Button
              variant="outlined"
              color="inherit"
              sx={{ mx: 1 }}
              onClick={() => push(paths.admin)}
            >
              Admin
            </Button>
          )}

          {user.isAuth && (
            <>
              <Button
                variant="text"
                color="inherit"
                sx={{ mx: 1 }}
                onClick={() => push(paths.user)}
              >
                <AccountCircleRoundedIcon />
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                sx={{ mx: 1 }}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}

          {!isAuthPage && !user.isAuth && (
            <>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mx: 1 }}
                onClick={() => push(paths.register)}
              >
                Register
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                sx={{ mx: 1 }}
                onClick={() => push(paths.login)}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
})
