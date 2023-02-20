import '../styles/global.css'
import type { AppProps } from 'next/app'
import { Sidebar } from '../Components/Sidebar/Sidebar'
import { SessionProvider } from 'next-auth/react'

import './index.css'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return <>
    <SessionProvider session={session}>

      <Component {...pageProps} />

    </SessionProvider>
  </>
}

export default MyApp
