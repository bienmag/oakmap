import '../styles/global.css'
import type { AppProps } from 'next/app'
import { Sidebar } from '../Components/Sidebar/Sidebar'

import './index.css'
function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Sidebar>
      <Component {...pageProps} />
    </Sidebar>
  </>
}

export default MyApp
