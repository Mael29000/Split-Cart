const Joi = require("joi");
const mongoose = require("mongoose");

const StatusEnum = ["taken", "missing", "lock", "remaining"];

const shoppingListSchema = mongoose.model(
  "ShoppingList",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    units: [
      {
        status: StatusEnum,
        user: String,
      },
    ],
  })
);

function validateShoppingList(shoppingList) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).required(),
    units: Joi.array().items(
      Joi.object({
        status: Joi.string().valid(...StatusEnum).required(),
        user: Joi.string().required(),
      })
    ),
  });

  return schema.validate(shoppingList);
}

exports.ShoppingList = shoppingListSchema;
exports.validate = validateShoppingList;
