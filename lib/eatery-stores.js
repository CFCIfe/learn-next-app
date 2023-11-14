//initialize unsplash
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.unsplash_access_key,
  secret: process.env.unsplash_secret_key,
});

const getListOfEateryPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "restaurant",
    page: 1,
    perPage: 10,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((unsplashResult) => {
    return unsplashResult.urls["small"];
  });
};

export const fetchEateryStores = async () => {
  const photos = await getListOfEateryPhotos();
  console.log("photos", photos);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.foursquare_authorization,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=Restaurants&ll=6.595770%2C3.337080&limit=5",
    options
  );

  const data = await response.json();
  console.log("data", data);
  return data.results.map((eateryStore, idx) => {
    console.log("idx", idx);
    return {
      ...eateryStore,
      imgUrl: photos[idx],
    };
  });
};
