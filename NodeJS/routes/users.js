const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');

router.post("/login", userController.loginUser);

router.post("/signup", userController.createUser);

module.exports = router;