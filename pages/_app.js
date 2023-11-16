import '@/styles/globals.css'
import { createContext, useReducer } from "react";
import { IBM_Plex_Sans } from "next/font/google";

const IBMPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_EATERY_STORES: "SET_EATERY_STORES",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return {
        ...state,
        latlong: action.payload.latlong,
      };
    case ACTION_TYPES.SET_EATERY_STORES:
      return {
        ...state,
        eateryStores: action.payload.eateryStores,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    latlong: "",
    eateryStores: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
