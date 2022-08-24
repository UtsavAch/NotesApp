const express = require("express");
const { registerUser } = require("../controllers/userControllers");

const router = new express.Router();

router.route("/").post(registerUser);

module.exports = router;
