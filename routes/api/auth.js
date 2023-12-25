const express = require("express");
const router = express.Router();
//middleware for auth
const auth = require("../../middleware/auth");
//for encrypting, and hashing(?) password
const bcrypt = require("bcryptjs");
//JWT for auth and token
const jwt = require("jsonwebtoken");
//config
const config = require("config");
//Express validator
const { check, validationResult } = require("express-validator");

//import User model
const User = require("../../models/User");
const Profile = require("../../models/Profile");
// // @route   GET api/auth
// // @desc    Test route
// // @access  Public
// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });




// // @route   GET api/auth
// // @desc    Test route
// // @access  Public
// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     const profile = await Profile.findOne({ user: req.user.id });
//     res.json({
//       user,
//       profileImage: profile ? profile.profileImage : null,
//     });
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });



// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findOne({ user: req.user.id });
   
    const profileImage = profile ? profile.profileImage : null;
    const userWithProfileImage = {
      ...user.toObject(),
      profileImage
    };
    res.json(userWithProfileImage);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  // validation for the data
  [
    check("email", "Valid email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // compares credential and returns a promise
      const isCredentialsMatched = await bcrypt.compare(
        password,
        user.password
      );

      //If there's no match for the credentials
      if (!isCredentialsMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "secret",
        { expiresIn: 360000 },
        (e, token) => {
          if (e) throw e;
          res.json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  }
);









// @route   PUT api/auth/password
// @desc    Change password
// @access  Private
router.put(
  "/password",
  [
    auth, // Apply the auth middleware to check for authentication
    [
      check("currentPassword", "Current password is required").exists(),
      check(
        "newPassword",
        "New password with 6 or more characters is required"
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    try {
      // Get the user from the database
      const user = await User.findById(req.user.id);

      // Check if the current password is correct
      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid current password" }] });
      }

      // Encrypt the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      // Save the updated user with the new password
      await user.save();

      res.json({ msg: "Password changed successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);
module.exports = router;
