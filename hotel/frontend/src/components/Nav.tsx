import React, { useContext } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { AppBar, Toolbar, useTheme } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { StoreContext } from '../store';
import { EndPoint } from '../constants/enums';
import { useNavigation, useAuth } from '../hooks';
import { OutlinedButton, TextButton } from './styled/buttons';
import { NavProps } from '../abstractions/props';
import { RouteLink } from './styled/common';
import { GrowTypography, StyledGrowBox } from './styled/containers';

const Nav: React.FC<NavProps> = ({ toggleTheme }) => {
  const { logoutHandler } = useAuth();
  const { authStore } = useContext(StoreContext);
  const { isAuthPages } = useNavigation();
  const { palette } = useTheme();

  return (
    <StyledGrowBox>
      <AppBar position="static">
        <Toolbar>
          <GrowTypography variant="h5">
            <Link href={EndPoint.MAIN}>Hotel app</Link>
            <TextButton onClick={toggleTheme}>
              {palette.mode === 'dark' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
            </TextButton>
          </GrowTypography>

          {authStore.getIsAuth() && authStore.isAdmin() && (
            <RouteLink href={EndPoint.ADMIN}>
              <OutlinedButton>Admin</OutlinedButton>
            </RouteLink>
          )}

          {authStore.getIsAuth() && (
            <>
              <RouteLink href={EndPoint.BOOKINGS}>
                <TextButton>
                  <AccountCircleRoundedIcon />
                </TextButton>
              </RouteLink>
              <OutlinedButton onClick={logoutHandler}>Logout</OutlinedButton>
            </>
          )}

          {!isAuthPages() && !authStore.getIsAuth() && (
            <>
              <RouteLink href={EndPoint.REGISTER}>
                <OutlinedButton>Register</OutlinedButton>
              </RouteLink>
              <RouteLink href={EndPoint.LOGIN}>
                <OutlinedButton>Login</OutlinedButton>
              </RouteLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </StyledGrowBox>
  );
};

export default observer(Nav);
