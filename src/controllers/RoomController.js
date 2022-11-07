const RoomModel = require("../models/RoomModel");

module.exports = {
  addRoom: async (req, res) => {
    const roomNo = req.body.roomNo;
    const capacity = req.body.capacity;

    let errors = {};

    if (roomNo === "") {
      errors = {
        ...errors,
        roomNo: "This field cannot be empty.",
      };
    }

    if (capacity === undefined || capacity < 1) {
      errors = {
        ...errors,
        capacity: "Enter a valid capacity value.",
      };
    }

    if (Object.keys(errors).length > 0) {
      res.json({ message: "Incorrect Inputs.", errors });
    } else {
      const newRoom = RoomModel({
        roomNo,
        capacity,
      });

      newRoom
        .save()
        .then(() => {
          res.json({ message: "Successful" });
        })
        .catch((err) => {
          console.log(err);
          res.json({ errors: "Something went wrong." });
        });
    }
  },
};
