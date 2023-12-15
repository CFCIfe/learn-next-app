import { findRecordsByFilter } from "@/lib/airtable";

const getEateryStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await findRecordsByFilter(id);

      if (records.length !== 0) {
        res.json(records);
      } else {
        res.json({ message: "No records found" });
      }
    } else {
      res.status(400);
      res.json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Something went wrong", error });
    console.error(error);
  }
};

export default getEateryStoreById;
