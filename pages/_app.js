import '@/styles/globals.css'
import { createContext, useReducer } from "react";
import { IBM_Plex_Sans } from "next/font/google";

import StoreProvider from "@/store/store-context";

const IBMPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${IBMPlexSans.style.fontFamily};
        }
      `}</style>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}
