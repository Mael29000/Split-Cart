const { ShoppingList, validate } = require("../models/shoppingList");
const express = require("express");
const router = express.Router();
const { wss } = require("../index");

router.get("/", async (req, res) => {
  const shoppingLists = await ShoppingList.find();
  res.send(shoppingLists);
});


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newShoppingList = new ShoppingList({
    name: req.body.name,
    price: req.body.price,
    units: req.body.units,
  });
  await newShoppingList.save();

  wss.broadcast({ type: "shoppingListAdded", data: newShoppingList });
  res.send(newShoppingList);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      units: req.body.units,
    },
    { new: true }
  );

  if (!updatedShoppingList)
    return res
      .status(404)
      .send("The shoppingList with the given ID was not found.");

  io.emit("shoppingListUpdated", updatedShoppingList);
  res.send(updatedShoppingList);
});

router.delete("/:id", async (req, res) => {
  const shoppingListToDelete = await ShoppingList.findByIdAndRemove(
    req.params.id
  );

  if (!shoppingListToDelete)
    return res
      .status(404)
      .send("The shoppingList with the given ID was not found.");

  io.emit("shoppingListDeleted", shoppingListToDelete);
  res.send(shoppingListToDelete);
});

router.get("/:id", async (req, res) => {
  const shoppingList = await ShoppingList.findById(req.params.id);

  if (!shoppingList)
    return res
      .status(404)
      .send("The shoppingList with the given ID was not found.");

  res.send(shoppingList);
});

module.exports = router;
