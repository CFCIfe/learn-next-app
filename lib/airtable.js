import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.airtable_api_key,
}).base(process.env.airtable_base_id);

const table = base("eatery-stores");

const getMinifiedRecord = (record) => {
  return {
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export { table, getMinifiedRecords };
