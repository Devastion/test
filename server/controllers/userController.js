const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

const User = require("../models/userModel");

// ! JWToken

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// ! POST /register
// ? Registers user
const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Checks if name and password are not empty
  if (!name || !password) {
    res.status(400);
    throw new Error("Please enter name or password");
  }

  // Checks if user exists
  const userExists = await User.findOne({ name });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // * TMDB Guest Session
  function getGuestSessionId() {
    return axios
      .get(
        "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=baa5e920e3f221f1c46904e941e296d2"
      )
      .then((response) => response.data.guest_session_id);
  }
  const guestSessionId = await getGuestSessionId();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    password: hashedPassword,
    session_id: guestSessionId,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
      guest_session_id: user.session_id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ! POST /login
// ? Login user
const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ! GET /me
// ? Login user
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
