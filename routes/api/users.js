const express = require("express");
const router = express.Router();
//Gravatar for profile pics
const gravatar = require("gravatar");
//for encrypting, and hashing(?) password
const bcrypt = require("bcryptjs");
//JWT for auth and token
const jwt = require("jsonwebtoken");
//config
const config = require("config");
//Express validator
const { check, validationResult } = require("express-validator");
// Importing our User model
const User = require("../../models/User");

const auth = require("../../middleware/auth");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  // validation for the data
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      //Get users gravatar for profile pic
      const avatar = gravatar.url(email, {
        //   size
        s: "200",
        // rating
        r: "pg",
        // default if user doesnt have gravatar
        d: "mm",
      });
      // create a new instance of user
      user = new User({
        name,
        email,
        avatar,
        password,
        // verified,
        // role,
        // rejectionComment,
      });
      //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
user.verified = "unverified";
user.role = "user";
user.rejectionComment = "none";
      await user.save();
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "secret", { expiresIn: 360000 }, (e, token) => {
        if (e) throw e;
        res.json({ token });
      });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);


// @route   PUT api/users/update/:id
// @desc    Update user verification status with rejection comment
// @access  Private (assuming authentication is required)
router.put("/update/:id", auth, async (req, res) => {
  const { verified, rejectionComment } = req.body;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
console.log("received data?", verified, rejectionComment);
    user.verified = verified;
  
      user.rejectionComment = rejectionComment;
   
    await user.save();

    res.json({ msg: "User verification status updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
