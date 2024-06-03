const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  verified: {
    type: String,
    default: "unverified",
  },
  rejectionComment: {
    type: String,
    default: "none",
  },
  role: {
    type: String,
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  profileImage: {
    type: String,
    default: null,
  },
  proofPicture: {
    type: String,
    default: null,
  },
  savedPosts: [
    {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    },
  ],
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
