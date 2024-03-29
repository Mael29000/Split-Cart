const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id: this._id,
    username: this.username,
  });
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(50).required()
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
