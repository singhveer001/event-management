const adminEventMap = require("../models/admin_event_map");
const Event = require("../models/event");

exports.list = async (req, res) => {
  try {
    let $and = [];
    const search = req.query.search;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.limit) : 0;

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
    console.log(data);
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

exports.adminList = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while fetching admin list",
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
      const newAdminMap = new adminEventMap({
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
