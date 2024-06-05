console.log("Server preparing...");

const express = require('express');
const app = express();
const port = 3200;
const MongoClient = require("mongodb").MongoClient;
const MongoConfig = {
  ip: "127.0.0.1",
  port: "27017",
  dbName: "zoptics",
}

const apiEndpoints = [
  { endpoint: "/api/products", collection: "products" },
  { endpoint: "/api/product-groups", collection: "product-groups" },
  { endpoint: "/api/articles", collection: "articles" },
  { endpoint: "/api/terms", collection: "terms" },
  { endpoint: "/api/data-protection", collection: "data-protection" },
  { endpoint: "/api/cover-slides", collection: "cover-slides" },
  { endpoint: "/api/refferences", collection: "refferences" },
  { endpoint: "/api/services", collection: "services" },

  {endpoint: "/articles/brit-tudosok-a-szemuvegesek-viccesebbek", collection: "brit-tudosok-a-szemuvegesek-viccesebbek"},
  {endpoint: "/articles/ha-igy-latsz-gaz-van", collection: "ha-igy-latsz-gaz-van"},
  {endpoint: "/articles/nem-fogod-elhinni-mit-latsz-ebben-a-szemuvegben", collection: "nem-fogod-elhinni-mit-latsz-ebben-a-szemuvegben"},
  {endpoint: "/articles/nyerj-utazast-szemuvegekkel", collection: "nyerj-utazast-szemuvegekkel"},
  {endpoint: "/articles/tech-testszag-javitas-szemuveggel", collection: "tech-testszag-javitas-szemuveggel"},
  {endpoint: "/articles/uj-orulet-kutyaszemuveg", collection: "uj-orulet-kutyaszemuveg"},
  {endpoint: "/articles/uj-szemuveg-szuletett", collection: "uj-szemuveg-szuletett"}
];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

async function getDataFromDatabase(collection) {
  const uri = `mongodb://${MongoConfig.ip}:${MongoConfig.port}`;
  const client = new MongoClient(uri);
  const result = [];

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const db = client.db(MongoConfig.dbName);
    const items = db.collection(collection);
    const cursor = items.find({});
    for await (const item of cursor) {
      result.push(item);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();

    return result;
  }
}

apiEndpoints.forEach(apiEndpoint => {
  app.get(apiEndpoint.endpoint, (req, res) => {
    getDataFromDatabase(apiEndpoint.collection)
      .then((result) => {
        res.json(result[0]);
      })
      .catch(() => {
        res.json({ data: [] });
      });
  });
});

// const apiEndpoints = [
//   { endpoint: "/api/products", resource: "./data/products.json" },
//   { endpoint: "/api/product-groups", resource: "./data/productGroups.json" },
//   { endpoint: "/api/articles", resource: "./data/articles.json" },
//   { endpoint: "/api/terms", resource: "./data/terms.json" },
//   { endpoint: "/api/data-protection", resource: "./data/data-protection.json" }
// ];

// apiEndpoints.forEach(apiEndpoint => {
//     const data = require(apiEndpoint.resource);
//     es.json(data);
// })