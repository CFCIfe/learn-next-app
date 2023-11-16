//initialize unsplash
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_unsplash_access_key,
  secret: process.env.NEXT_PUBLIC_unsplash_secret_key,
});

const getUrlForEateryStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};

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

export const fetchEateryStores = async (
  latlong = "6.595770%2C3.337080",
  limit = 6
) => {
  const photos = await getListOfEateryPhotos();
  console.log({ photos });
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_foursquare_authorization,
    },
  };

  const response = await fetch(
    getUrlForEateryStores(latlong, "Restaurants", limit),
    options
  );

  const data = await response.json();
  return data.results.map((eateryStore, idx) => {
    return {
      //   ...eateryStore,
      id: eateryStore.fsq_id,
      address: eateryStore.location.formatted_address,
      name: eateryStore.name,
      neighborhood: eateryStore.location.cross_street,
      imgUrl: photos[idx],
    };
  });
};
