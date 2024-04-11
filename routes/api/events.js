const express = require("express");
const router = express.Router();
// vlidation
const { check, validationResult } = require("express-validator");
//auth middleware
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Event = require("../../models/Event");


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
    name: "eventimage",
    maxCount: 1,
  },
  {
    name: "eventbackgroundimage",
    maxCount: 1,
  },
];


// @route   POST api/events
// @desc    Create a event
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
        "eventimage",
        "eventbackgroundimage",
      ];
      
      const images = {};
      
      imageFields.forEach((fieldName) => {
        if (req.files[fieldName]) {
          images[fieldName] = req.files[fieldName][0].path;
        }
      });
      const newEvent = new Event({
        eventInfo: {
          eventImages: images,
          title: req.body.title,
          description: req.body.description,
          type: req.body.type,
          privacy: req.body.privacy,
          eventImage: req.body.eventImage,
          eventBackgroundImage: req.body.eventBackgroundImage,
        },
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      
      });

      const event = await newEvent.save();
      res.json(event);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/events/:id
// @desc    Update a event
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
        "eventimage",
        "eventbackgroundimage",
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
      const event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }

      // Only allow post update by post owner
      if (event.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      (event.eventInfo = {
       eventImages: images,
        title: req.body.title,
        description: req.body.description,
       
      }),
        (event.name = user.name),
        (event.avatar = user.avatar),
        (event.user = req.user.id);

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);





// @route   GET api/events
// @desc    Get all events
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Get all events
    const events = await Event.find().sort({ date: -1 });

    // Loop through each post and get the user's profileImage
    const eventsWithProfileImages = await Promise.all(
        events.map(async (event) => {
        const profile = await Profile.findOne({ user: event.user });
        const profileImage = profile ? profile.profileImage : null;
        return { ...event._doc, profileImage };
      })
    );

    res.json(eventsWithProfileImages);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});




// @route   POST api/events/:id/request
// @desc    Request to join a event
// @access  Private
router.post("/:id/request", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if the user is already a member
    if (event.members.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is already a member of this event" });
    }

    // Check if the user has already sent a request
    if (event.pendingRequests.includes(req.user.id)) {
      return res.status(400).json({ msg: "User has already sent a request to join this event" });
    }

    event.pendingRequests.push(req.user.id);
    await event.save();

    res.json({ msg: "Request sent successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/events/:id/leave
// @desc    Leave a event
// @access  Private
router.put("/:id/leave", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if the user is a member of the event
    if (!event.members.includes(req.user.id)) {
      return res.status(400).json({ msg: "User is not a member of this event" });
    }

    // Remove user from members array
    event.members = event.members.filter(member => member.toString() !== req.user.id);
    await event.save();

    res.json({ msg: "User left the event successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});





// // @route   GET api/events/:id
// // @desc    Get event by Event Id
// // @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     //   to get the most recent events
//     const event = await Event.findById(req.params.id);
//     // if there are no event
//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }
//     res.json(event);
//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Event not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });


// // @route   GET api/events/:id
// // @desc    Get event by Event Id
// // @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }
//     const profile = await Profile.findOne({ user: event.user });
//     res.json({
//       _id: event._id,
//       name: event.name,
//       profileImage: profile ? profile.profileImage : null,
//       eventInfo: event.eventInfo,
//       date: event.date,
//       likes: event.likes,
//       comments: event.comments,
//     });
//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Event not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route   GET api/events/:id
// @desc    Get event by Event Id
// @access  Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }
//     const profile = await Profile.findOne({ user: event.user });
//     res.json(event);

//   } catch (e) {
//     console.error(e.message);
//     if (e.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Event not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });



// @route   GET api/events/:id
// @desc    Get a event by ID
// @access  Public (or Private if you want to restrict access)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route   PUT api/events/:id/accept-request/:userId
// @desc    Accept a request to join the event
// @access  Private
router.put("/:id/accept-request/:userId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if the user making the request is the owner of the event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if the user to be accepted is in pending requests
    if (!event.pendingRequests.includes(req.params.userId)) {
      return res.status(400).json({ msg: "User is not in pending requests" });
    }

    // Add the user to the members array
    event.members.push(req.params.userId);

    // Remove the user from pending requests
    event.pendingRequests = event.pendingRequests.filter(
      (userId) => userId.toString() !== req.params.userId
    );

    await event.save();

    res.json({ msg: "User accepted to the event successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/events/:id/reject-request/:userId
// @desc    Reject a request to join the event
// @access  Private
router.put("/:id/reject-request/:userId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if the user making the request is the owner of the event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if the user to be rejected is in pending requests
    if (!event.pendingRequests.includes(req.params.userId)) {
      return res.status(400).json({ msg: "User is not in pending requests" });
    }

    // Remove the user from pending requests
    event.pendingRequests = event.pendingRequests.filter(
      (userId) => userId.toString() !== req.params.userId
    );

    await event.save();

    res.json({ msg: "Request rejected successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// @route   DELETE api/events/:id
// @desc    Delete a event by Id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //   to get the most recent events
    const event = await Event.findById(req.params.id);
    // if the event doesn't exist
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    //   Check if user doesn't own the event
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await event.remove();
    res.json({ msg: "Event Removed" });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(500).send("Server Error");
  }
});

// // @route   PUT api/events/like/:id
// // @desc    Like a event
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

// @route   POST api/events/:id/posts
// @desc    Create a post in a event
// @access  Private
router.post("/:id/posts", [auth], async (req, res) => {
  const errors = validationResult(req);
  //   if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const event = await Event.findById(req.params.id);
  
 
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
    event.posts.unshift(newPost);

    await event.save();
    res.json(event.posts);
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

