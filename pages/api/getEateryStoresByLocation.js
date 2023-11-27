import { fetchEateryStores } from "@/lib/eatery-stores";

const getEateryStoresByLocation = async (req, res) => {
  try {
    const { latlong, limit } = req.query;

    const response = await fetchEateryStores(latlong, limit);

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
};

export default getEateryStoresByLocation;
