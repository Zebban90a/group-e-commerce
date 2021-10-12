const express = require("express");
const cors = require("cors");

const app = express();
const UserRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
const ProductRoute = require("./routes/ProductRoute");
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT }));
app.use("/api/users", UserRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/products", ProductRoute);

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" },
  ];
  res.json(customers);
});

module.exports = app;
