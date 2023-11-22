import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "@/store/store-context";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  // const [latlong, setlatlong] = useState("");
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setlatlong(`${latitude}%2C${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {
        latlong: `${latitude}%2C${longitude}`,
      },
    });
    setLocationErrorMsg("");
    setIsFindingLocation(false);
  };
  const error = () => {
    setLocationErrorMsg("Unable to retrieve your location");
    setIsFindingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  // console.log({ latlong });

  return {
    //latlong,
    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  };
};

export default useTrackLocation;
