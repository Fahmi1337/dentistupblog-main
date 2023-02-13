const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  postInfo: {
    bloodPressure: {
      type: String,
      required: true,
    },
    dailyMedications: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    dentalHistory: {
      type: String,
      required: true,
    },
    dermato: {
      type: String,
      required: true,
    },
    detailsDeglutition: {
      type: String,
      required: true,
    },
    detailsMastication: {
      type: String,
      required: true,
    },
    detailsRespiration: {
      type: String,
      required: true,
    },
    examenExoBuccal: {
      type: String,
      required: true,
    },
    extraoralExamination: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    imageTest: {
      type: String,
      required: true,
    },
    intraoralExamination: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
      required: true,
    },
    patientReference: {
      type: String,
      required: true,
    },
    pulse: {
      type: String,
      required: true,
    },
    reasonConsultation: {
      type: String,
      required: true,
    },
    respiration: {
      type: String,
      required: true,
    },
    symetrieExplanation: {
      type: String,
      required: true,
    },
  },

  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
