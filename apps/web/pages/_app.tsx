import '../styles/global.css'
import type { AppProps } from 'next/app'

import './index.css'
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
