import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import moment from 'moment';
import 'moment/min/locales';

moment.locale('ru');

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
