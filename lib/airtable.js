import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.airtable_api_key,
}).base(process.env.airtable_base_id);

const table = base("eatery-stores");

const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordsByFilter = async (id) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();
  return getMinifiedRecords(findRecords);
};

export { table, getMinifiedRecords, findRecordsByFilter };
