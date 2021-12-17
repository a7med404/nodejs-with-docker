var express = require("express");
const Item = require("../models/Item");
var router = express.Router();

router.get("/", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    gty: req.body.gty,
  });
  await item.save();
  res.send(item);
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });
    res.send(item);
  } catch {
    res.status(404);
    res.send({ error: "Item doesn't exist!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findById({ _id: req.params.id });

    item.name = req.body.name;
    item.description = req.body.description;
    item.price = req.body.price;
    item.gty = req.body.gty;

    await item.save();
    res.send(item);
  } catch {
    res.status(404);
    res.send({ error: "Item doesn't exist!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Item doesn't exist!" });
  }
});

module.exports = router;
