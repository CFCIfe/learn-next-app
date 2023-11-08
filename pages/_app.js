import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  <footer>
    <small>
      Copyright © 2023 Peter Abolude. All Rights Reserved.
    </small>
  </footer></>
}
