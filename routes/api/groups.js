const express = require("express");
const router = express.Router();
// vlidation
const { check, validationResult } = require("express-validator");
//auth middleware
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Group = require("../../models/Group");

// @route   POST api/groups
// @desc    Create a group
// @access  Private
router.post(
  "/",
  [auth, [check("title", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //   if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newGroup = new Group({
        grouptInfo: {
          title: req.body.title,
          description: req.body.description,
         
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
  [auth, [check("title", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //   if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const group = await Group.findById(req.params.id);

      if (!group) {
        return res.status(404).json({ msg: "Group not found" });
      }

      // Only allow post update by post owner
      if (group.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      (group.groupInfo = {
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

// // @route   GET api/groups
// // @desc    Get all groups
// // @access  Private
// router.get("/", auth, async (req, res) => {
//   try {
//     //   to get the most recent groups
//     const groups = await group.find().sort({ date: -1 });
//     res.json(groups);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });




// @route   GET api/groups
// @desc    Get all groups
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Get all groups
    const groups = await Post.find().sort({ date: -1 });

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

// @route   GET api/groupss/:id
// @desc    Get group by Group Id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    const profile = await Profile.findOne({ user: group.user });

    const commentsWithProfileImage = [];
    for (const comment of group.comments) {
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
      _id: group._id,
      name: group.name,
      profileImage: profile ? profile.profileImage : null,
      groupInfo: group.groupInfo,
      date: group.date,
      likes: group.likes,
      user: group.user,
      avatar: group.avatar,
      _v: group._v,
      comments: commentsWithProfileImage,
    });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Group not found" });
    }
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

// // @route   POST api/posts/comment/:id
// // @desc    Create a comment on a post
// // @access  Private
// router.post("/comment/:id", [auth], async (req, res) => {
//   const errors = validationResult(req);
//   //   if there are errors
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     const post = await Post.findById(req.params.id);
  
//     const newComment = {
//       treatment: req.body.formData.treatment,
//       diagnostic: req.body.formData.diagnostic,
//       name: user.name,
//       avatar: user.avatar,
//       user: req.user.id,
//     };

//     post.comments.unshift(newComment);

//     await post.save();
//     res.json(post.comments);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });




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

