import React, { useContext, useState } from 'react'
import { Box, Button, Container, TextField, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { userApi } from '../api'
import { Context } from '../store'
import { observer } from 'mobx-react-lite'
import { paths } from '../shared/enums'
import { ErrorResponse } from '../interfaces/responses'
import { basketClient } from '../clients'
import { errorViewer } from '../shared/constants'

export const AuthPage: React.FC = observer(() => {
  const location = useLocation()
  const isRegister = location.pathname === paths.register
  const { palette } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { push } = useHistory()
  const { user, basket } = useContext(Context)

  const submitHandler = async () => {
    try {
      const data = isRegister
        ? await userApi.register(email, password)
        : await userApi.login(email, password)

      user.setUser(data.user)
      user.setIsAuth(true)
      user.setId(data.id)

      basketClient.loadOne(data.id, basket, () => push(paths.main))
    } catch (e) {
      errorViewer(e)
    }
  }

  return (
    <div className="container">
      <Container>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '40ch',
            },
          }}
          noValidate
          autoComplete="off"
          className="form"
        >
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, my: 2 }}>
            {isRegister ? 'Register' : 'Login'}
          </Typography>
          <TextField
            id="outlined-email"
            label="E-mail"
            type="email"
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              py: 3,
              width: '40ch',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography component="div">
              {isRegister ? 'Already have account? ' : `Don't have account? `}
              <Typography component="span" sx={{ color: palette.primary.main }}>
                <NavLink to={isRegister ? paths.login : paths.register}>
                  {isRegister ? ' Login' : 'Register'}
                </NavLink>
              </Typography>
            </Typography>
            <Button variant="contained" onClick={submitHandler}>
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
})
