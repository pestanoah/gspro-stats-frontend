import { AppProvider } from './provider'

type AppProps = {
  children: React.ReactNode
}

export default function App({ children }: AppProps) {
  return <AppProvider>{children}</AppProvider>
}
