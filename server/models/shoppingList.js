const Joi = require("joi");
const mongoose = require("mongoose");

const shoppingListSchema = mongoose.model(
  "ShoppingList",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      price: {
        type: Number,
        required: false,
        min: 0,
      },
      units:{
        type: [],
        required: true,
        default: []
      }
    }
  )
);

function validateShoppingList(shoppingList) {
  const schema = {
    title: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(0).required(),
    units: Joi.array().items(Joi.string()).required()
  };

  return Joi.validate(shoppingList, schema);
}

exports.ShoppingList = shoppingListSchema;
exports.validate = validateShoppingList;
