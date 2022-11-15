const express = require("express");
const bookingController = require("../controllers/BookingController");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.post("/", bookingController.getTimetable);

router.post("/book", UserController.isAuthenticated, bookingController.makeBooking);

router.post("/bookI", UserController.isSuperAdmin, bookingController.makeBooking);

router.put("/update", bookingController.updateBooking);

router.delete("/del", UserController.isSuperAdmin, bookingController.deleteBooking);

router.delete("/delU", UserController.isAuthenticated, UserController.isOwnerOf, bookingController.deleteBooking);

router.post("/accept", UserController.isSuper, bookingController.approveBooking);

router.delete("/reject", UserController.isSuper, bookingController.rejectBooking);

module.exports = router;
