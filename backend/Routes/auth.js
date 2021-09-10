const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  try {
    email = req.body.email;
    password = req.body.password;
    //--------------------user--------------------
    const user = await User.findOne({ email });
    !user && res.status(404).json("user not found");
    //--------------------password----------------
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("Wrong password");
    //--------------------if-both-true------------
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
