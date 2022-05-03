import type { AppProps } from "next/app"
import { NotificationsProvider } from "@mantine/notifications"
import "../styles/global.css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NotificationsProvider>
      <Component {...pageProps} />
    </NotificationsProvider>
  )
}

export default MyApp
