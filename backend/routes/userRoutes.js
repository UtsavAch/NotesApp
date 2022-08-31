const express = require("express");
const {
  getAllUsers,
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = new express.Router();

router.route("/").get(getAllUsers);
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
