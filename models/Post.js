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
      required: false,
    },
    dailyMedications: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
    dentalHistory: {
      type: String,
      required: false,
    },
    dermato: {
      type: String,
      required: false,
    },
    detailsDeglutition: {
      type: String,
      required: false,
    },
    detailsMastication: {
      type: String,
      required: false,
    },
    detailsRespiration: {
      type: String,
      required: false,
    },
    examenExoBuccal: {
      type: String,
      required: false,
    },
    extraoralExamination: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    intraoralExamination: {
      type: String,
      required: false,
    },
    medicalHistory: {
      type: String,
      required: false,
    },
    patientReference: {
      type: String,
      required: false,
    },
    pulse: {
      type: String,
      required: false,
    },
    reasonConsultation: {
      type: String,
      required: false,
    },
    respiration: {
      type: String,
      required: false,
    },
    symetrieExplanation: {
      type: String,
      required: false,
    },
    atmAutre: {
      type: String,
      required: false,
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
      treatment: {
        type: String,
      },
      diagnostic: {
        type: String,
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
