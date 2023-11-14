export const fetchEateryStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.Authorization,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=Restaurants&ll=6.595770%2C3.337080&limit=5",
    options
  );

  const data = await response.json();
  console.log(data);
  return data.results;
};
