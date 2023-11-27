import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.airtable_api_key,
}).base(process.env.airtable_base_id);

const table = base("eatery-stores");

console.log({ table });

const createEateryStore = (req, res) => {
  res.json({ message: "hi there!" });
};

export default createEateryStore;
