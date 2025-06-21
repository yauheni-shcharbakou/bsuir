import { ThemeOptions, Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const darkOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#42a5f6',
    },
    secondary: {
      main: '#c41442',
    },
    background: {
      default: '#000000',
      paper: '#212121',
    },
  },
};

const lightOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#42a5f6',
    },
    secondary: {
      main: '#c41442',
    },
    background: {
      default: '#ffffff',
      paper: '#dcdcdc',
    },
  },
};

export default function theme(isDark: boolean): Theme {
  return createTheme(isDark ? darkOptions : lightOptions);
}
