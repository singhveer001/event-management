const { default: mongoose } = require("mongoose");
const AdminEventMap = require("../models/admin_event_map");
const Event = require("../models/event");

exports.list = async (req, res) => {
  try {
    let $and = [];
    const search = req.query.search;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    if (search && search.length > 0) {
      $and.push({
        $or: [
          { name: new RegExp(search, "i") },
          { location: new RegExp(search, "i") },
        ],
      });
    }

    const filter = $and.length > 0 ? { $and } : {};
    const sort = { createdAt: -1 };
    const collation = { locale: "en" };
    const data = await Event.find(filter)
      .sort(sort)
      .collation(collation)
      .skip(offset)
      .limit(limit);

    const count = await Event.countDocuments(filter).exec();

    return res.status(200).json({
      count: count ? count : 0,
      data: data && data.length > 0 ? data : [],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while fetching list",
    });
  }
};

exports.userEvent = async (req, res) => {
  try {
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
