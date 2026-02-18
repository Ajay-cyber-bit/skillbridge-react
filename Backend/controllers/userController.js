const User = require("../models/User");
const bcrypt = require("bcryptjs");


// Register user
exports.registerUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = new User({

      ...req.body,
      password: hashedPassword

    });

    await newUser.save();

    res.json({
      message: "Registration successful"
    });

  }
  catch (error) {

    res.json({
      message: "Registration error"
    });

  }

};



// Login user
exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.json({
        message: "User not found"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.json({
        message: "Invalid password"
      });

    }

    res.json({
      message: "Login successful",
      user
    });

  }
  catch (error) {

    res.json({
      message: "Login error"
    });

  }

};
