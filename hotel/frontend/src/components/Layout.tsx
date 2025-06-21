import React from 'react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LayoutProps } from '../abstractions/props';
import Nav from './Nav';
import theme from '../styles/theme';
import { store, StoreContext } from '../store';
import { useThemeState } from '../hooks';

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { isDark, toggleThemeHandler } = useThemeState();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
      </Head>
      <main>
        <StoreContext.Provider value={store}>
          <ThemeProvider theme={theme(isDark)}>
            <CssBaseline />
            <Nav toggleTheme={toggleThemeHandler} />
            {children}
          </ThemeProvider>
        </StoreContext.Provider>
      </main>
    </>
  );
};

export default Layout;
