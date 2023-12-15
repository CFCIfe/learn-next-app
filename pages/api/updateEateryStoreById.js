import { table, findRecordsByFilter, getMinifiedRecords } from "@/lib/airtable";

const updateEateryStoreById = async (req, res) => {
  if (req.method === "PUT") {
    const { id } = req.body;
    try {
      if (id) {
        const records = await findRecordsByFilter(id);
        if (records.length !== 0) {
          const record = records[0];

          const calculateVoting = parseInt(record.voting) + 1;

          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);

          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord);
            res.json(minifiedRecords);
          }
        } else {
          res.json({ message: `Record with ID ${id} not found` });
        }
      } else {
        res.status(422);
        res.json({ message: "ID is required" });
      }
    } catch (err) {
      console.error("Error voting for a Store", err);
      res.status(500);
      res.json({ message: "Error voting for a Store", err });
    }
  }
};

export default updateEateryStoreById;
