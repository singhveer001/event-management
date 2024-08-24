const mongoose = require("mongoose");

const adminEventMapSchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId, // object id
      ref: "Admin",
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

const adminEventMap = mongoose.model("Admin_event_map", adminEventMapSchema);

module.exports = adminEventMap;
