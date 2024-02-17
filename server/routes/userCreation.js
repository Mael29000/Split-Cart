const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["username"]));
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "username"]));

});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;