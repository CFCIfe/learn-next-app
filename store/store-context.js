import { createContext, useReducer } from "react";

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

export default StoreProvider;
