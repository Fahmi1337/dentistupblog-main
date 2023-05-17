const express = require("express");
const router = express.Router();

// for authentication middleware
const auth = require("../../middleware/auth");
//validation by express
const { check, validationResult } = require("express-validator");
//Request
const request = require("request");
// config
const config = require("config");

// importing Profile model
const Profile = require("../../models/Profile");
// importing User model
const User = require("../../models/User");
// importing User model
const Post = require("../../models/Post");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    // if there's no profile
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});



// @route   POST api/profile
// @desc    Create or update the user's profile
// @access  Private
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
router.use(express.static('public'));
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
  }
})
const upload = multer({ storage: storage });
const dirname = path.resolve();
router.use('/uploads', express.static(path.join(dirname, '/uploads')));

router.post(
  "/",
 
  // upload.single('profileImage'),
  // upload.single('profileCover'),
  upload.fields([{
    name: 'profileImage', maxCount: 1
  }, {
    name: 'profileCover', maxCount: 1
  }]),
  [    
    auth,    
    [      
      check("status", "Status is required").not().isEmpty(),      
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are erros
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructure the request
    const {
      name,
      title,
      company,
      website,
      location,
      bio,
      status,
      speciality,
      // githubusername,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    let profileImage = null;
    if (req.files.profileImage) {
      profileImage = req.files.profileImage[0].path;
    }


    let profileCover = null;
    if (req.files.profileCover) {
      profileCover = req.files.profileCover[0].path;
    }

console.log("user?", req.user.id)


    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (title) profileFields.title = title;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (speciality) profileFields.speciality = speciality;
    // if (githubusername) profileFields.githubusername = githubusername;
    if (profileImage) profileFields.profileImage = profileImage;
    if (profileCover) profileFields.profileCover = profileCover;
    // Separating the skills by comma from the skills array
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    // Build Social media array object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      let user = await User.findById(req.user.id);

      // if there is a profile that match
      if (profile) {
        // Update the profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        // Update the name field in the user object
        if (name) {
          user.name = name;
          await user.save();
        }

        return res.json(profile);
      }

      // Create a new profile
      profile = new Profile(profileFields);
      await profile.save();

      // Update the name field in the user object
      if (name) {
        user.name = name;
        await user.save();
      }

      res.json(profile);
      // res.status(status).json(profile, user)
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);



// router.post(
//   "/",

//   // add middleware for profileCover upload
//   upload.fields([{ name: 'profileImage' }, { name: 'profileCover' }]),

//   [        auth,        [            check("status", "Status is required").not().isEmpty(),            check("skills", "Skills are required").not().isEmpty(),    ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     // if there are erros
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // destructure the request
//     const {
//       name,
//       company,
//       website,
//       location,
//       bio,
//       status,
//       speciality,
//       githubusername,
//       skills,
//       youtube,
//       twitter,
//       instagram,
//       linkedin,
//       facebook,
//        // add new variable for profileCover
//     } = req.body;

//     let profileImage = null;
//     if (req.files && req.files.profileImage) {
//       profileImage = req.files.profileImage[0].path;
//     }

//     let profileCover = null;
//     if (req.files && req.files.profileCover) {
//       profileCover = req.files.profileCover[0].path;
//     }
//     console.log("profileImage?", profileImage);
// console.log("profileCover?", profileCover);
//     // Build profile object
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (company) profileFields.company = company;
//     if (website) profileFields.website = website;
//     if (location) profileFields.location = location;
//     if (bio) profileFields.bio = bio;
//     if (status) profileFields.status = status;
//     if (speciality) profileFields.speciality = speciality;
//     if (githubusername) profileFields.githubusername = githubusername;
//     if (profileImage) profileFields.profileImage = profileImage;
//     if (profileCover) profileFields.profileCover = profileCover; // add new field for profileCover

//     // Separating the skills by comma from the skills array
//     if (skills) {
//       profileFields.skills = skills.split(",").map((skill) => skill.trim());
//     }
//     // Build Social media array object
//     profileFields.social = {};
//     if (youtube) profileFields.social.youtube = youtube;
//     if (twitter) profileFields.social.twitter = twitter;
//     if (facebook) profileFields.social.facebook = facebook;
//     if (linkedin) profileFields.social.linkedin = linkedin;
//     if (instagram) profileFields.social.instagram = instagram;

//     try {
//       let profile = await Profile.findOne({ user: req.user.id });
//       let user = await User.findById(req.user.id);

//       // if there is a profile that match
//       if (profile) {
//         // Update the profile
//         profile = await Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           { new: true }
//         );

//         // Update the name field in the user object
//         if (name) {
//           user.name = name;
//           await user.save();
//         }

//         return res.json(profile);
//       }

//       profile = new Profile(profileFields);
//       await profile.save();

//       if (name) {
//         user.name = name;
//         await user.save();
//       }

//       res.status(status).json(profile, user);
//     } catch (e) {
//       console.error(e.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );




// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});





// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    // if there's no such profile
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (e) {
    console.error(e.message);
    // if the id is wrong or too much characters
    if (e.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user & posts by user ID
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User removed" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/experience
// @desc    Add profle experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructuring
    const { title, company, location, from, to, current, description } =
      req.body;
    // create a new Experience object
    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // push to the beginning to the array
      profile.experience.unshift(newExperience);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    delete profle's experience by exp id
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index for the experience
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/education
// @desc    Add profle education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructuring
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    // create a new Experience object
    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // push to the beginning to the array
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    delete profle's education by edu id
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index for the education
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from GitHub
// @access  Public
router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      ),
      method: "GET",
      headers: {
        "user-agent": "node.js",
        Authorization: `token ${config.get("githubToken")}`,
      },
    };

    request(options, (error, response, body) => {
      // if there are error
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github Profile Found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});






// @route   PUT api/profile/savepost/:id
// @desc    Save a post
// @access  Private
// router.put("/savepost/:id", auth, async (req, res) => {

//   try {
//     const user = await User.findById(req.user.id);
//     // checking if the post has been saved by the logged in's user

//     if (
//       user.savedPosts.filter((savedPost) => savedPost?.post?.toString() === req.params.id).length >
//       0
//     ) 
//     {
//       return res.status(400).json({ msg: "Post already saved" });
//     }

//     user.savedPosts.unshift({ post: req.params.id });
//     await user.save();
//     res.json(user.savedPosts);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });



// @route   PUT api/profile/savepost/:id
// @desc    Save or unsave a post
// @access  Private
router.put("/savepost/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const savedPostIndex = user.savedPosts.findIndex(
      (savedPost) => savedPost?.post?.toString() === req.params.id
    );

    if (savedPostIndex !== -1) {
      // Post has already been saved, so unsave it
      user.savedPosts.splice(savedPostIndex, 1);
      await user.save();
      return res.json({ msg: "Post unsaved", savedPosts: user.savedPosts });
    }

    // Post hasn't been saved, so save it
    user.savedPosts.unshift({ post: req.params.id });
    await user.save();
    res.json({ msg: "Post saved", savedPosts: user.savedPosts });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
