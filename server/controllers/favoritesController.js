const asyncHandler = require("express-async-handler");
const Favorite = require("../models/favoriteModel");

// ! GET /favorites
// ? Get Favorites
const getFavorites = asyncHandler(async (req, res) => {
  const userFavorites = await Favorite.find({ user: req.user._id });

  res.status(200).json(userFavorites);
});

// ! POST /favorites
// ? Add Movie to Favorites
const addFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.create({
    user: req.user._id,
    movie_id: req.body.movie_id,
  });

  if (favorite) {
    return res.status(201).json({
      message: "Success. Favorite added",
    });
  }
  return res.status(400).json({ message: "Already in favorites" });
});

// ! Delete /delete
// ? Delete Movie from Favorites
const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findOneAndRemove({
    user: req.user._id,
    movie_id: req.body.movie_id,
  });

  res.status(200).json({ favorite });

  // return res.status(200).json({ favorite });
});

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
