const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.get("/api/customers", cors(), (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" },
  ];

  res.json(customers);
});

module.exports = app;
