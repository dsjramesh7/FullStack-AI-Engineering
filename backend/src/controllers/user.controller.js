import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists!" });
    }

    //create a new user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User Created Successfully!!!",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found!!",
      });
    }

    //Compare Passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Creditenials",
      });
    }

    res.status(200).json({
      message: "User successfully LoggedIn",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found!!!",
      });
    }

    res.status.json({
      message: "User Logout Successfully!!!",
    });
  } catch (error) {
    res.status.json({
      message: "Internal server error",
      error,
    });
  }
};
