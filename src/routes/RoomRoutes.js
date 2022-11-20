const express = require("express");
const roomController = require("../controllers/RoomController");
const userControllers = require("../controllers/UserController");

const router = express.Router();

router.get("/", roomController.getRoom);

router.post("/addRoom", userControllers.isSuper, roomController.addRoom);

module.exports = router;
