import type { AppProps } from 'next/app';
import React from 'react';
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import '../styles/global.css';
import '../../node_modules/normalize.css/normalize.css';
import { createEmotionCache } from '../shared/common';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
