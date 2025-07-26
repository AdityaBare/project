const { status } = require("http-status");
const User = require('../model/UserModel');
const bcrypt = require("bcrypt");

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
    const newUser = new User({ username, password: hashPassword, mobile, email });
    await newUser.save();

    res
      .status(status.CREATED)
      .json({ message: "Account created", success: true });
  } catch (e) {
    res.status(status.INTERNAL_SERVER_ERROR).json(e);
  }
};


module.exports = { signUp };
