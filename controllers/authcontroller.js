const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    let user = await User.findOne({ email });
    let isAdmin = user.role == "admin";
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id, res);
    return res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      user: {
        ...user._doc,
        password: "",
        userType: isAdmin ? "admin" : "user",
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("Crime_Report", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
