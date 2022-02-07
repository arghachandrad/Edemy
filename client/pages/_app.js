import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider } from "@emotion/react"
import createEmotionCache from "../styles/createEmotionCache"
import { Provider } from "react-redux"
import "/styles/globals.css"
import theme from "../styles/theme"
import TopNav from "../components/TopNav"
import { store } from "../redux/store"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Edemy</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <TopNav />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            theme="colored"
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  )
}
