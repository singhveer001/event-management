const { default: mongoose } = require("mongoose");
const AdminEventMap = require("../models/admin_event_map");
const Event = require("../models/event");
const userEventMap = require("../models/user_event_map");


exports.userEvent = async (req, res) => {
  try {
    const eventId = req.query.id;
    const search = req.query.search || "";
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    // Filter
    const matchStage = { status: { $ne: 2 } };
    if (search && search.length > 0) {
      matchStage.$or = [
        { username: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const userPipeline = [
      {
        $match: {
          eventId : new mongoose.Types.ObjectId(eventId), 
          status : 1
        },
      },
      
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
          pipeline: [
            {
              $match: matchStage,
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "user._id": { $exists: true },
        },
      },
      {
        $project: {
          _id: "$user._id",
          name: "$user.username",
          email: "$user.email",
          status: "$user.status",
          bookingTime: "$createdAt",
        },
      },
      { $sort: { bookingTime: -1 } },
      {
        $facet: {
          count: [{ $count: "value" }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ];

    const result = await userEventMap.aggregate(userPipeline);

    if (!result || !result[0] || result[0].data.length === 0) {
      return res
        .status(200)
        .json({ message: "No events found", count: 0, data: [] });
    }

    const { count, data } = result[0];

    return res.status(200).json({
      count: count.length ? count[0].value : 0,
      data: data,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while fetching user event",
    });
  }
};


exports.adminEventList = async (req, res) => {
  try {
    const adminId = req.query.id;
    const search = req.query.search || "";
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    // Filter
    const matchStage = { status: { $ne: 2 } };
    if (search && search.length > 0) {
      matchStage.$or = [
        { name: new RegExp(search, "i") },
        { location: new RegExp(search, "i") },
      ];
    }

    const eventPipeline = [
      {
        $match: {
          adminId: new mongoose.Types.ObjectId(adminId),
          status: 1,
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
          pipeline: [
            {
              $match: matchStage,
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$event",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "event._id": { $exists: true },
        },
      },
      {
        $project: {
          _id: "$event._id",
          name: "$event.name",
          detail: "$event.detail",
          location: "$event.location",
          status: "$event.status",
          createdAt: "$event.createdAt",
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          count: [{ $count: "value" }],
          data: [{ $skip: offset }, { $limit: limit }],
        },
      },
    ];

    const result = await AdminEventMap.aggregate(eventPipeline);

    if (!result || !result[0] || result[0].data.length === 0) {
      return res
        .status(200)
        .json({ message: "No events found", count: 0, data: [] });
    }

    const { count, data } = result[0];

    return res.status(200).json({
      count: count.length ? count[0].value : 0,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching admin event list:", error.message);
    return res.status(500).json({
      message: "An error occurred while fetching the admin event list.",
    });
  }
};

exports.create = async (req, res) => {
  const { name, location, detail, date, adminId } = req.body;
  try {
    const newEvent = new Event({
      name,
      location,
      detail,
      date,
    });

    const data = await newEvent.save();

    if (data._id) {
      const eventId = data._id;
      const newAdminMap = new AdminEventMap({
        adminId,
        eventId,
      });
      await newAdminMap.save();
    }

    return res.status(200).json({
      message: "Event created successfully",
      data: data,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while creating event",
    });
  }
};

exports.update = async (req, res) => {
  const { name, location, detail, date } = req.body;
  try {
    const eventId = req.params.id;
    const updateEvent = await Event.findByIdAndUpdate(
      eventId,
      { name, location, date, detail },
      { new: true }
    );

    if (!updateEvent) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Event Updated Successfully    ",
      data: updateEvent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occured while updating",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventDelete = await Event.findByIdAndUpdate(
      eventId,
      { status: 2 },
      { new: true }
    );

    if (!eventDelete) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while deleting event",
    });
  }
};

exports.permanentDelete = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deleted = await Event.findByIdAndDelete(eventId);
    if (!deleted) {
      return res.status(404).json({
        message: "Event not found ",
      });
    }
    return res.status(200).json({
      message: "Event deleted Successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occured while deleting event",
    });
  }
};
