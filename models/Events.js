const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  eventInfo: {
    eventImages:{
      eventimage: {
      type: String,
      default: null,
    },
    eventbackgroundimage: {
      type: String,
      default: null,
    },
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    privacy: {
      type: String,
      required: false,
    },
    // eventImage: {
    //   type: String,
    //   default: null,
    // },
    // eventBackgroundImage: {
    //   type: String,
    //   default: null,
    // },
  },

  name: {
    type: String,
  },
  avatar: {
    type: String,
  },


  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  ],
  pendingRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  ],



  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],

  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "post",
      },
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
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Event = mongoose.model("event", EventSchema);
