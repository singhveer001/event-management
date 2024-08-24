const mongoose = require("mongoose");

const userEventMapSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // object id
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2], // 0=> inactive , 1=> active, 2=> delete/trash
      default: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userEventMap = mongoose.model("User_event_map", userEventMapSchema);

module.exports = userEventMap;
