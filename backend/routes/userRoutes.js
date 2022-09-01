const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  uploadAvatar,
  uploadMiddleware,
  deleteAvatar,
  getAvatar,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = new express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/avatar").post(protect, uploadMiddleware, uploadAvatar);
router.route("/avatar").delete(protect, deleteAvatar);
router.route("/avatar").get(protect, getAvatar);

module.exports = router;
