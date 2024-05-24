console.log("Prepare server for running...");

const express = require('express');
const app = express();
const port = 3200;
const apiEndpoints = [
  { endpoint: "/api/products", resource: "./data/products.json" },
  { endpoint: "/api/product-groups", resource: "./data/productGroups.json" },
  { endpoint: "/api/articles", resource: "./data/articles.json" },
  { endpoint: "/api/terms", resource: "./data/terms.json" },
  { endpoint: "/api/data-protection", resource: "./data/data-protection.json" }
];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
})

apiEndpoints.forEach(apiEndpoint => {
  app.get(apiEndpoint.endpoint, (req, res) => {
    const data = require(apiEndpoint.resource);
    res.json(data);
  });
})