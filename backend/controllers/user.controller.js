const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Event = require("../models/event");
const UserEventMap = require("../models/user_event_map");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: "User not exist",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid credantial",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const session = {
      username: existingUser.username,
      email: existingUser.email,
    };

    return res.status(200).json({
      message: "User login successfully",
      token,
      session,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while login",
    });
  }
};

exports.signUp = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already available with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // generate a jwt token and send it as a response
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const session = {
      username: newUser.username,
      email: newUser.email,
    };

    return res.status(201).json({
      message: "User created successfully",
      token,
      session,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while signup",
    });
  }
};

exports.eventList = async (req, res) => {
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

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body && req.body.data ? JSON.parse(req.body.data) : {};
    let updateFields = { username: data.username };
    console.log(req.body);
    console.log(data);  

    // Check if an image file was uploaded
    if (req.file) {
      updateFields.image = `${process.env.BASE_URL}/uploads/admin/${req.file.filename}`;
    }
    console.log(req.file);
    const updateUser = await User.findByIdAndUpdate(
      id,
      { ...updateFields },
      { new: true }
    );
    return res.status(200).json({
      message: "Username Updated",
      data: updateUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while updating",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndUpdate(
      id,
      { status: 2 },
      { new: true }
    );
    return res.status(200).json({
      message: `${deleteUser.username} deleted successfully`,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while delete",
    });
  }
};

exports.permanentDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while permanent delete",
    });
  }
};

exports.bookEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    const bookEvent = new UserEventMap({
      userId,
      eventId,
    });

    await bookEvent.save();

    return res.status(200).json({
      message: "Event book successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while User booking event",
    });
  }
};
