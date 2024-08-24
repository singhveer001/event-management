const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: "User not exist",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid credantial",
      });
    }

    const token = jwt.sign(
      { adminId: existingUser._id },
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
      { adminId: newUser._id },
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

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { username } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { username },
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



exports.bookEvent = async (req, res) =>{
    try {
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: "An error occur while User booking event"
        })
    }
}