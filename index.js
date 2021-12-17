const express = require("express");
const mongoose = require("mongoose");

const app = express();

var indexRouter = require("./routes/index");
var itemsRouter = require("./routes/items");

const PORT = process.env.SERVER_PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", indexRouter);
app.use("/items", itemsRouter);

mongoose
  .connect(process.env.DATABASE_URI, { useNewUrlParser: true })
  .then(() => {
    const app = express();

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
