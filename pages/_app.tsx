// pages/_app.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/index'; // Make sure the path is correct for your Redux store
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
