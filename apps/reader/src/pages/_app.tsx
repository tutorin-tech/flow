import './styles.css'
import 'react-photo-view/dist/react-photo-view.css'

import { LiteralProvider } from '@literal-ui/core'
import { ErrorBoundary } from '@sentry/nextjs'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import { Layout, Theme } from '../components'

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${process.env.NEXT_PUBLIC_BASE_READER_PATH}/sw.js`)
          .then(registration => {
            console.log('SW зарегистрирован: ', registration);
          })
          .catch(error => {
            console.error('Ошибка регистрации SW: ', error);
          })
      })
    }
  }, [])

  const router = useRouter()

  if (router.pathname === '/success') return <Component {...pageProps} />

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <LiteralProvider>
        <RecoilRoot>
          <Theme />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </LiteralProvider>
    </ErrorBoundary>
  )
}

const Fallback: React.FC = () => {
  return <div>Something went wrong.</div>
}
