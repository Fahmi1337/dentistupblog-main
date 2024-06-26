const express = require("express");
const router = express.Router();
// vlidation
const { check, validationResult } = require("express-validator");
//auth middleware
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Group = require("../../models/Group");


const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");


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
    name: "groupimage",
    maxCount: 1,
  },
  {
    name: "groupbackgroundimage",
    maxCount: 1,
  },
];


// @route   POST api/groups
// @desc    Create a group
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
      const imageFields = [
        "groupimage",
        "groupbackgroundimage",
      ];
      
      const images = {};
      
      imageFields.forEach((fieldName) => {
        if (req.files[fieldName]) {
          images[fieldName] = req.files[fieldName][0].path;
        }
      });
      const newGroup = new Group({
        groupInfo: {
          groupImages: images,
          title: req.body.title,
          description: req.body.description,
          type: req.body.type,
          privacy: req.body.privacy,
          groupImage: req.body.groupImage,
          groupBackgroundImage: req.body.groupBackgroundImage,
        },
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      
      });

      const group = await newGroup.save();
      res.json(group);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/groups/:id
// @desc    Update a group
// @access  Private
router.put(
  "/:id",
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
      const imageFields = [
        "groupimage",
        "groupbackgroundimage",
      ];
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
      const group = await Group.findById(req.params.id);

      if (!group) {
        return res.status(404).json({ msg: "Group not found" });
      }

      // Only allow post update by post owner
      if (group.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      (group.groupInfo = {
       groupImages: images,
        title: req.body.title,
        description: req.body.description,
       
      }),
        (group.name = user.name),
        (group.avatar = user.avatar),
        (group.user = req.user.id);

      const updatedGroup = await group.save();
      res.json(updatedGroup);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);





// @route   GET api/groups
// @desc    Get all groups
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Get all groups
    const groups = await Group.find().sort({ date: -1 });

    // Loop through each post and get the user's profileImage
    const groupsWithProfileImages = await Promise.all(
        groups.map(async (group) => {
        const profile = await Profile.findOne({ user: group.user });
        const profileImage = profile ? profile.profileImage : null;
        return { ...group._doc, profileImage };
      })
    );

    res.json(groupsWithProfileImages);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});




// @route   POST api/groups/:id/request
// @desc    Request to join a group
// @access  Private
router.post("/:id/request", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Check if the user is already a member
    if (group.members.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is already a member of this group" });
    }

    // Check if the user has already sent a request
    if (group.pendingRequests.includes(req.user.id)) {
      return res.status(400).json({ msg: "User has already sent a request to join this group" });
    }

    group.pendingRequests.push(req.user.id);
    await group.save();

    res.json({ msg: "Request sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/groups/:id/leave
// @desc    Leave a group
// @access  Private
router.put("/:id/leave", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Check if the user is a member of the group
    if (!group.members.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is not a member of this group" });
    }

    // Remove user from members array
    group.members = group.members.filter(member => member.toString() !== req.user.id);
    await group.save();

    res.json({ msg: "User left the group successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});





// // @route   GET api/groups/:id
// // @desc    Get group by Group Id
// // @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     //   to get the most recent groups
//     const group = await Group.findById(req.params.id);
//     // if there are no group
//     if (!group) {
//       return res.status(404).json({ msg: "Group not found" });
//     }
//     res.json(group);
//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Group not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });


// // @route   GET api/groups/:id
// // @desc    Get group by Group Id
// // @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).json({ msg: "Group not found" });
//     }
//     const profile = await Profile.findOne({ user: group.user });
//     res.json({
//       _id: group._id,
//       name: group.name,
//       profileImage: profile ? profile.profileImage : null,
//       groupInfo: group.groupInfo,
//       date: group.date,
//       likes: group.likes,
//       comments: group.comments,
//     });
//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Group not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route   GET api/groups/:id
// @desc    Get group by Group Id
// @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).json({ msg: "Group not found" });
//     }
//     const profile = await Profile.findOne({ user: group.user });
//     res.json(group);

//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Group not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });



// @route   GET api/groups/:id
// @desc    Get a group by ID
// @access  Public (or Private if you want to restrict access)
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route   PUT api/groups/:id/accept-request/:userId
// @desc    Accept a request to join the group
// @access  Private
router.put("/:id/accept-request/:userId", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Check if the user making the request is the owner of the group
    if (group.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if the user to be accepted is in pending requests
    if (!group.pendingRequests.includes(req.params.userId)) {
      return res.status(400).json({ msg: "User is not in pending requests" });
    }

    // Add the user to the members array
    group.members.push(req.params.userId);

    // Remove the user from pending requests
    group.pendingRequests = group.pendingRequests.filter(
      (userId) => userId.toString() !== req.params.userId
    );

    await group.save();

    res.json({ msg: "User accepted to the group successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/groups/:id/reject-request/:userId
// @desc    Reject a request to join the group
// @access  Private
router.put("/:id/reject-request/:userId", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Check if the user making the request is the owner of the group
    if (group.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if the user to be rejected is in pending requests
    if (!group.pendingRequests.includes(req.params.userId)) {
      return res.status(400).json({ msg: "User is not in pending requests" });
    }

    // Remove the user from pending requests
    group.pendingRequests = group.pendingRequests.filter(
      (userId) => userId.toString() !== req.params.userId
    );

    await group.save();

    res.json({ msg: "Request rejected successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route   DELETE api/groups/:id
// @desc    Delete a group by Id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //   to get the most recent groups
    const group = await Group.findById(req.params.id);
    // if the group doesn't exist
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    //   Check if user doesn't own the group
    if (group.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await group.remove();
    res.json({ msg: "Group Removed" });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.status(500).send("Server Error");
  }
});

// // @route   PUT api/groups/like/:id
// // @desc    Like a group
// // @access  Private
// router.put("/like/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // checking if the post has been liked by the logged in's user
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id).length >
//       0
//     ) {
//       return res.status(400).json({ msg: "Post already liked" });
//     }

//     post.likes.unshift({ user: req.user.id });
//     await post.save();
//     res.json(post.likes);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   PUT api/posts/unlike/:id
// // @desc    Unlike a post
// // @access  Private
// router.put("/unlike/:id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // checking if the post has not been liked by the logged in's user
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id)
//         .length === 0
//     ) {
//       return res.status(400).json({ msg: "Post has not yet been liked" });
//     }

//     //   Get remove index
//     const removeIndex = post.likes
//       .map((like) => like.user.toString())
//       .indexOf(req.user.id);
//     post.likes.splice(removeIndex, 1);
//     await post.save();
//     res.json(post.likes);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route   POST api/groups/:id/posts
// @desc    Create a post in a group
// @access  Private
router.post("/:id/posts", [auth], async (req, res) => {
  const errors = validationResult(req);
  //   if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const group = await Group.findById(req.params.id);
  
 
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
    
    imageFields.forEach((fieldName) => {
      if (req.files[fieldName]) {
        images[fieldName] = req.files[fieldName][0].path;
      }
    });

    console.log("req?", req.body);
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

        
        casediagnostics: req.body.casediagnostics,
        treatmentplan: req.body.treatmentplan,
        sessions: req.body.sessions,
      },
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    group.posts.unshift(newPost);

    await group.save();
    res.json(group.posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});




// // @route   PUT api/posts/comment/:postId/:commentId
// // @desc    Edit a comment on a post
// // @access  Private
// router.put("/comment/:postId/:commentId", [auth], async (req, res) => {
//   const errors = validationResult(req);
  
//   // Return 400 error response if there are validation errors
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
  
//   try {
//     const post = await Post.findById(req.params.postId);
    
//     // Find the index of the comment to be edited
//     const commentIndex = post.comments.findIndex(
//       (comment) => comment._id.toString() === req.params.commentId
//     );

//     // Return 404 error response if the comment is not found
//     if (commentIndex === -1) {
//       return res.status(404).json({ msg: "Comment not found" });
//     }

//     // Only allow the user who created the comment to edit it
//     if (post.comments[commentIndex].user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "Not authorized" });
//     }

//     // Update the comment object with the new data
//     post.comments[commentIndex].treatment = req.body.formData.treatment;
//     post.comments[commentIndex].diagnostic = req.body.formData.diagnostic;

//     // Save the updated post
//     await post.save();
    
//     // Return the updated comments array as response
//     res.json(post.comments);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });


// // @route   GET api/posts/comment/:id/:comment_id
// // @desc    Get a comment by id
// // @access  Private
// router.get("/comment/:id/:comment_id", [auth], async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     // Check if post exists
//     if (!post) {
//       return res.status(404).json({ msg: "Post not found" });
//     }
//     // Find the comment by id
//     const comment = post.comments.find((comment) => comment.id.toString() === req.params.comment_id);
//     // Check if comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: "Comment not found" });
//     }
//     res.json(comment);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });




// // @route   POST api/posts/comment/:id/:comment_id
// // @desc    Delete a comment on a post
// // @access  Private
// router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     //Pull out comment from the post
//     const comment = post.comments.find(
//       (comment) => comment.id.toString() === req.params.comment_id
//     );
//     //Make sure comment exists
//     if (!comment) {
//       return res.status(404).json({ msg: "Comment not found" });
//     }
//     //Check if user is the one that made the comment
//     if (comment.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "User not authorized" });
//     }

//     comment.remove();

//     await post.save();

//     res.json(post.comments);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;

