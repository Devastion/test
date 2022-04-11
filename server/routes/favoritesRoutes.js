const express = require("express");

const router = express.Router();
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoritesController");
const { protect } = require("../middleware/authMiddleware");

router.get("/favorites", protect, getFavorites);
router.post("/favorites", protect, addFavorite);
router.delete("/delete", protect, deleteFavorite);

module.exports = router;
