const express = require("express");
const userControllers = require("../controllers/UserController");

const router = express.Router();

router.put("/register", userControllers.register);

router.post("/login", userControllers.authenticate);

router.delete("/delete", userControllers.isSuper, userControllers.deleteUser);

module.exports = router;
