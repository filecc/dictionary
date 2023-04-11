import '@/styles/globals.css'
import { createContext, useContext, useState } from 'react';




export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
