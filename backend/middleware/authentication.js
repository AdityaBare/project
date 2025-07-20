const { status } = require("http-status");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const signUp = async (req, res) => {
  const { username, mobile, password, email } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(status.ALREADY_REPORTED)
      .json({ message: "User already exists", success: false });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 9);
    const token = crypto.randomBytes(10).toString("hex");

    const newUser = new User({
      username,
      password: hashPassword,
      mobile,
      email,
      token,
    });
    await newUser.save();
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "None",
    });

    res
      .status(status.CREATED)
      .json({ message: "Account created", success: true });
  } catch (e) {
    res.status(status.INTERNAL_SERVER_ERROR).json(e);
  }
};

const login = async (req, res) => {
  if (!req.body) {
    return res.status(status.BAD_REQUEST).json({ message: "Bad request" });
  }
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: "Invalid email", success: false });
    }

    if (await bcrypt.compare(password, existUser.password)) {
      const token = crypto.randomBytes(10).toString("hex");
      await User.updateOne({ email: email }, { $set: { token: token } });
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "None",
      });
      return res
        .status(status.ACCEPTED)
        .json({ message: "Login", success: true, token: token });
    }

    return res
      .status(status.NOT_FOUND)
      .json({ message: "Password is incorrect", success: false });
  } catch (e) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong", error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    });
  } catch (r) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: "Error", success: false });
  }

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signUp, login, logout };
