const express = require("express");
const router = express.Router();
// vlidation
const { check, validationResult } = require("express-validator");
//auth middleware
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("bloodPressure", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //   if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        postInfo: {
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
          respirationNasal: req.body.respirationNasal,
          respirationBuccal: req.body.respirationBuccal,
          respirationMixte: req.body.respirationMixte,
          detailsRespiration: req.body.detailsRespiration,
          masticationUnilateral: req.body.masticationUnilateral,
          masticationBilateral: req.body.masticationBilateral,
          detailsMastication: req.body.detailsMastication,
          deglutitionTypique: req.body.deglutitionTypique,
          deglutitionAtypique: req.body.deglutitionAtypique,
          detailsDeglutition: req.body.detailsDeglutition,
        },
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

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
  "/:id",
  [auth, [check("bloodPressure", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //   if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      // Only allow post update by post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      (post.postInfo = {
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
        respirationNasal: req.body.respirationNasal,
        respirationBuccal: req.body.respirationBuccal,
        respirationMixte: req.body.respirationMixte,
        detailsRespiration: req.body.detailsRespiration,
        masticationUnilateral: req.body.masticationUnilateral,
        masticationBilateral: req.body.masticationBilateral,
        detailsMastication: req.body.detailsMastication,
        deglutitionTypique: req.body.deglutitionTypique,
        deglutitionAtypique: req.body.deglutitionAtypique,
        detailsDeglutition: req.body.detailsDeglutition,
      }),
        (post.name = user.name),
        (post.avatar = user.avatar),
        (post.user = req.user.id);

      const updatedPost = await post.save();
      res.json(updatedPost);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    //   to get the most recent posts
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get post by Post Id
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    //   to get the most recent posts
    const post = await Post.findById(req.params.id);
    // if there are no post
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
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
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // checking if the post has been liked by the logged in's user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (e) {
    console.error(e.message);
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
    console.log("hello", req.body.formData);
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

// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// const port = 5000;

// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage,
// });

// app.post("/upload", upload.single("image"), (req, res) => {
//   res.send("Image uploaded successfully!");
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
