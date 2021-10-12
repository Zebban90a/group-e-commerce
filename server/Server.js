const server = require("./App");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then(() => console.log("connected successfully"));

server.listen(port, () => `Server running on port ${process.env.PORT || 5000}`);
