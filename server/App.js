const express = require("express");
const app = express();
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
const ProductRoute = require("./routes/ProductRoute");

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT }));

app.use("/api/users", UserRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/products", ProductRoute);

module.exports = app;
