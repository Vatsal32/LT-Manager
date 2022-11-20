const {
  Schema,
  model
} = require("mongoose");
const RoomSchema = new Schema({
  roomNo: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  }
});
module.exports = model("rooms", RoomSchema);