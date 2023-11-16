import '@/styles/globals.css'
import { createContext } from "react";
import { IBM_Plex_Sans } from "next/font/google";

const IBMPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const initialState = {
    latlong: "",
    coffeeStores: [],
  };
  return (
    <StoreContext.Provider value={{ state: { initialState } }}>
      {children}
    </StoreContext.Provider>
  );
};

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
