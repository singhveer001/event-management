const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.json({
        message: "Admin not exist",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid credantial",
      });
    }

    const token = jwt.sign(
      { adminId: existingAdmin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const session = {
      username: existingAdmin.username,
      email: existingAdmin.email,
    };

    return res.status(200).json({
      message: "Admin login successfully",
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
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already available with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
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
      message: "Admin created successfully",
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
    const updateAdmin = await Admin.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );
    return res.status(200).json({
      message: "Username Updated",
      data: updateAdmin,
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
    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      { status: 2 },
      { new: true }
    );
    return res.status(200).json({
      message: `${deleteAdmin.username} deleted successfully`,
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
    await Admin.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "An error occur while permanent delete",
    });
  }
};
