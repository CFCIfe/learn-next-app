import { table, getMinifiedRecords, findRecordsByFilter } from "@/lib/airtable";

const createEateryStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
    try {
      if (id) {
        const records = await findRecordsByFilter(id);
        if (records.length !== 0) {
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(422);
            res.json({ message: "Id or Name is required." });
          }
        }
      } else {
        res.status(422);
        res.json({ message: "ID is required" });
      }
    } catch (err) {
      console.error("Error creating or finding a Store", err);
      res.status(500);
      res.json({ message: "Error creating or finding a Store", err });
    }
  }
};
export default createEateryStore;
