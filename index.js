console.log("Prepare server for running...");

const express = require('express');
const app = express();
const port = 3200;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

// endpoint url, action
app.get('/api/products', function (req, res) {
  res.send('HELLO WORLD');
})
