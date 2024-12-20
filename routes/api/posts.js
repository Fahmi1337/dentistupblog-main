const express = require("express");
const router = express.Router();
// vlidation
const { check, validationResult } = require("express-validator");
//auth middleware
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const generate = require('./generate');
const { blurTextInImage } = require("./imageUtils");
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
router.use(bodyParser.json());
router.use(express.static("public"));
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + extension);
  },
});
const upload = multer({ storage: storage });
const dirname = path.resolve();
router.use("/uploads", express.static(path.join(dirname, "/uploads")));



const imageFields = [
  {
    name: "radiopanoramicbefore",
    maxCount: 1,
  },
  {
    name: "radiopanoramicafter",
    maxCount: 1,
  },
  {
    name: "conebeambefore",
    maxCount: 1,
  },
  {
    name: "conebeamafter",
    maxCount: 1,
  },
  {
    name: "endobuccalebefore",
    maxCount: 1,
  },
  {
    name: "endobuccaleafter",
    maxCount: 1,
  },
  {
    name: "vuefacebefore",
    maxCount: 1,
  },
  {
    name: "vuefaceafter",
    maxCount: 1,
  },
  {
    name: "vueprofilbefore",
    maxCount: 1,
  },
  {
    name: "vueprofilafter",
    maxCount: 1,
  },
  {
    name: "teleradioprofilbefore",
    maxCount: 1,
  },
  {
    name: "teleradioprofilafter",
    maxCount: 1,
  },
];
// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  upload.fields(imageFields),
  [auth, [check("title", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //   if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      // let postImage = null;
      // if (req.files.postImage) {
      //   postImage = req.files.postImage[0].path;
      // }

      const imageFields = [
        "radiopanoramicbefore",
        "radiopanoramicafter",
        "conebeambefore",
        "conebeamafter",
        "endobuccalebefore",
        "endobuccaleafter",
        "vuefacebefore",
        "vuefaceafter",
        "vueprofilbefore",
        "vueprofilafter",
        "teleradioprofilbefore",
        "teleradioprofilafter",
      ];
      
      const images = {};
      
      // imageFields.forEach((fieldName) => {
      //   if (req.files[fieldName]) {
      //     images[fieldName] = req.files[fieldName][0].path;
      //   }
      // });


      for (const fieldName of imageFields) {
        if (req.files[fieldName]) {
            const imagePath = req.files[fieldName][0].path;
    
            // Remove text from the image and get the modified image path
            const modifiedImagePath = await blurTextInImage(imagePath);
    
            // Store the modified image path in the images object
            images[fieldName] = modifiedImagePath;
        }
    }
    
      

      // console.log("req?", req.body);
      const newPost = new Post({
        postInfo: {
          postImages: images,
          title: req.body.title,
          description: req.body.description,
          bloodPressure: req.body.bloodPressure,
          dailyMedications: req.body.dailyMedications,
          dateOfBirth: req.body.dateOfBirth,
          dentalHistory: req.body.dentalHistory,
          dermato: req.body.dermato,
          detailsDeglutition: req.body.detailsDeglutition,
          detailsMastication: req.body.detailsMastication,
          detailsRespiration: req.body.detailsRespiration,
          examenExoBuccal: req.body.examenExoBuccal,
          extraoralExamination: req.body.extraoralExamination,
          gender: req.body.gender,
          concernedTeeth: req.body.concernedTeeth,
          intraoralExamination: req.body.intraoralExamination,
          medicalHistory: req.body.medicalHistory,
          patientReference: req.body.patientReference,
          pulse: req.body.pulse,
          reasonConsultation: req.body.reasonConsultation,
          respiration: req.body.respiration,
          symetrieExplanation: req.body.symetrieExplanation,
          symetrie: req.body.symetrie,

          examenAtmNormal: req.body.examenAtmNormal,
          examenAtmDouleur: req.body.examenAtmDouleur,
          examenAtmClaquement: req.body.examenAtmClaquement,
          examenAtmAutre: req.body.examenAtmAutre,
          examenAtmAutreExplanation: req.body.examenAtmAutreExplanation,

          respirationType: req.body.respirationType,
          detailsRespiration: req.body.detailsRespiration,

          mastication: req.body.mastication,
          detailsMastication: req.body.detailsMastication,

          deglutition: req.body.deglutition,
          detailsDeglutition: req.body.detailsDeglutition,
          visibility: req.body.visibility,


          participants : req.body.participants.split(",").map((skill) => skill.trim()),

          // participants: req.body.participants,
          casediagnostics: req.body.casediagnostics,
          treatmentplan: req.body.treatmentplan,
          // sessions: req.body.sessions,
          associatedgroup: req.body.associatedgroup,
          groupId: req.body.groupId,
        },
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const aiResponse = await generate(`From this data, generate a more insightful diagnosis and treatment plan, skip including the data provided like patient overview and clinical findings, use html br tags only so the response is organized : ${newPost.postInfo}`);
      newPost.postInfo.airesponse = aiResponse;

      const post = await newPost.save();
      res.json(post);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);








// @route   PUT api/posts/:id
// @desc    Update a post
// @access  Private
router.put(
  '/:id',
  upload.fields(imageFields),
  [auth],
  async (req, res) => {
    const errors = validationResult(req);
    //   if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const imageFields = [
        'radiopanoramicbefore',
        'radiopanoramicafter',
        'conebeambefore',
        'conebeamafter',
        'endobuccalebefore',
        'endobuccaleafter',
        'vuefacebefore',
        'vuefaceafter',
        'vueprofilbefore',
        'vueprofilafter',
        'teleradioprofilbefore',
        'teleradioprofilafter',
      ];

        // Fetch the existing post to get the current image URLs
        const existingPost = await Post.findById(req.params.id);
        if (!existingPost) {
          return res.status(404).json({ msg: 'Post not found' });
        }
  
        const existingPostImages = existingPost.postInfo.postImages;
  
        const images = {};

      imageFields.forEach((fieldName) => {
        if (req.files[fieldName]) {
          // If a new file is uploaded, update the URL
          images[fieldName] = req.files[fieldName][0].path;
        } else {
          // If no new file is uploaded, keep the existing URL
          images[fieldName] = existingPostImages[fieldName];
        }
      });

      
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'postInfo.postImages': images,
            'postInfo.title': req.body.title,
            'postInfo.description': req.body.description,
            'postInfo.bloodPressure': req.body.bloodPressure,
            'postInfo.dailyMedications': req.body.dailyMedications,
            'postInfo.dateOfBirth': req.body.dateOfBirth,
            'postInfo.dentalHistory': req.body.dentalHistory,
            'postInfo.dermato': req.body.dermato,
            'postInfo.detailsDeglutition': req.body.detailsDeglutition,
            'postInfo.detailsMastication': req.body.detailsMastication,
            'postInfo.detailsRespiration': req.body.detailsRespiration,
            'postInfo.examenExoBuccal': req.body.examenExoBuccal,
            'postInfo.extraoralExamination': req.body.extraoralExamination,
            'postInfo.gender': req.body.gender,
            'postInfo.concernedTeeth': req.body.concernedTeeth,
            'postInfo.intraoralExamination': req.body.intraoralExamination,
            'postInfo.medicalHistory': req.body.medicalHistory,
            'postInfo.patientReference': req.body.patientReference,
            'postInfo.pulse': req.body.pulse,
            'postInfo.reasonConsultation': req.body.reasonConsultation,
            'postInfo.respiration': req.body.respiration,
            'postInfo.symetrieExplanation': req.body.symetrieExplanation,
            'postInfo.symetrie': req.body.symetrie,
            
            'postInfo.examenAtmNormal': req.body.examenAtmNormal,
            'postInfo.examenAtmDouleur': req.body.examenAtmDouleur,
            'postInfo.examenAtmClaquement': req.body.examenAtmClaquement,
            'postInfo.examenAtmAutre': req.body.examenAtmAutre,
            'postInfo.examenAtmAutreExplanation': req.body.examenAtmAutreExplanation,
    
            'postInfo.respirationType': req.body.respirationType,
            'postInfo.detailsRespiration': req.body.detailsRespiration,
    
            'postInfo.mastication': req.body.mastication,
            'postInfo.detailsMastication': req.body.detailsMastication,
            'postInfo.visibility': req.body.visibility,
            'postInfo.deglutition': req.body.deglutition,
            'postInfo.detailsDeglutition': req.body.detailsDeglutition,
            'postInfo.participants' : req.body.participants.split(",").map((skill) => skill.trim()),
            // participants: req.body.participants,
            'postInfo.casediagnostics': req.body.casediagnostics,
            'postInfo.treatmentplan': req.body.treatmentplan,
            // 'postInfo.sessions': req.body.sessions,
            'postInfo.associatedgroup': req.body.associatedgroup,
            'postInfo.groupId': req.body.groupId,
            
          },
        },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      res.json(updatedPost);
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);












// // @route   GET api/posts
// // @desc    Get all posts
// // @access  Private
// router.get("/", auth, async (req, res) => {
//   try {
//     //   to get the most recent posts
//     const posts = await Post.find().sort({ date: -1 });
//     res.json(posts);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Get all posts
    const posts = await Post.find().sort({ date: -1 });

    // Loop through each post and get the user's profileImage
    const postsWithProfileImages = await Promise.all(
      posts.map(async (post) => {
        const profile = await Profile.findOne({ user: post.user });
        const profileImage = profile ? profile.profileImage : null;
        return { ...post._doc, profileImage };
      })
    );

    res.json(postsWithProfileImages);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// // @route   GET api/posts/:id
// // @desc    Get post by Post Id
// // @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     //   to get the most recent posts
//     const post = await Post.findById(req.params.id);
//     // if there are no post
//     if (!post) {
//       return res.status(404).json({ msg: "Post not found" });
//     }
//     res.json(post);
//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Post not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET api/posts/:id
// // @desc    Get post by Post Id
// // @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ msg: "Post not found" });
//     }
//     const profile = await Profile.findOne({ user: post.user });
//     res.json({
//       _id: post._id,
//       name: post.name,
//       profileImage: profile ? profile.profileImage : null,
//       postInfo: post.postInfo,
//       date: post.date,
//       likes: post.likes,
//       comments: post.comments,
//     });
//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Post not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route   GET api/posts/:id
// @desc    Get post by Post Id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const profile = await Profile.findOne({ user: post.user });

    const commentsWithProfileImage = [];
    for (const comment of post.comments) {
      const commentProfile = await Profile.findOne({ user: comment.user });
      commentsWithProfileImage.push({
        _id: comment._id,

        name: comment.name,
        profileImage: commentProfile ? commentProfile.profileImage : null,
        user: comment.user,
        date: comment.date,
        treatment: comment.treatment,
        diagnostic: comment.diagnostic,
        avatar: comment.avatar,
      });
    }

    res.json({
      _id: post._id,
      name: post.name,
      profileImage: profile ? profile.profileImage : null,
      postInfo: post.postInfo,
      date: post.date,
      likes: post.likes,
      user: post.user,
      avatar: post.avatar,
      _v: post._v,
      comments: commentsWithProfileImage,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post by Id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //   to get the most recent posts
    const post = await Post.findById(req.params.id);
    // if the post doesn't exist
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //   Check if user doesn't own the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
// router.put("/like/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // checking if the post has been liked by the logged in's user
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id).length >
//       0
//     ) {
//       const removeIndex = post.likes
//         .map((like) => like.user.toString())
//         .indexOf(req.user.id);
//       post.likes.splice(removeIndex, 1);
//       await post.save();
//       res.json(post.likes);
//     } else {
//       post.likes.unshift({ user: req.user.id });
//       await post.save();
//       res.json(post.likes);
//     }
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });


router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // checking if the post has been liked by the logged-in user
    const likedByUser = post.likes.find(like => like.user.toString() === req.user.id);

    if (likedByUser) {
      // Remove the like
      const removeIndex = post.likes.indexOf(likedByUser);
      post.likes.splice(removeIndex, 1);
      await post.save();
      res.json(post.likes);
    } else {
      // Add the like
      const user = await User.findById(req.user.id);
      const newLike = {
        user: req.user.id,
        name: user.name
      };
      post.likes.unshift(newLike);
      await post.save();
      res.json(post.likes);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});




// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // checking if the post has not been liked by the logged in's user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    //   Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts/comment/:id
// @desc    Create a comment on a post
// @access  Private
router.post("/comment/:id", [auth], async (req, res) => {
  const errors = validationResult(req);
  //   if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      treatment: req.body.formData.treatment,
      diagnostic: req.body.formData.diagnostic,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/comment/:postId/:commentId
// @desc    Edit a comment on a post
// @access  Private
router.put("/comment/:postId/:commentId", [auth], async (req, res) => {
  const errors = validationResult(req);

  // Return 400 error response if there are validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.postId);

    // Find the index of the comment to be edited
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === req.params.commentId
    );

    // Return 404 error response if the comment is not found
    if (commentIndex === -1) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Only allow the user who created the comment to edit it
    if (post.comments[commentIndex].user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update the comment object with the new data
    post.comments[commentIndex].treatment = req.body.formData.treatment;
    post.comments[commentIndex].diagnostic = req.body.formData.diagnostic;

    // Save the updated post
    await post.save();

    // Return the updated comments array as response
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/comment/:id/:comment_id
// @desc    Get a comment by id
// @access  Private
router.get("/comment/:id/:comment_id", [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // Find the comment by id
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );
    // Check if comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    res.json(comment);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts/comment/:id/:comment_id
// @desc    Delete a comment on a post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment from the post
    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );
    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    //Check if user is the one that made the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    comment.remove();

    await post.save();

    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
