const UserModel = require("../models/UsersModel");
const RoomModel = require("../models/RoomModel");

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

const checkUserValid = async (field, value) => {
  let error, isUnique;
  ({ error, isUnique } = await UserModel.findOne({ _id: value })
    .exec()
    .then((user) => {
      let res = {};
      if (!user) {
        res = {
          error: { [field]: `This ${value} is not available. ` },
          isValid: false,
        };
      } else {
        res = { error: { [field]: "" }, isValid: true };
      }
      return res;
    }));
  return { error, isUnique };
};

const checkLTValid = async (field, value) => {
  let error, isUnique;
  ({ error, isUnique } = await RoomModel.findOne({ _id: value })
    .exec()
    .then((user) => {
      let res = {};
      if (!user) {
        res = {
          error: { [field]: `This ${value} is not available. ` },
          isValid: false,
        };
      } else {
        res = { error: { [field]: "" }, isValid: true };
      }
      return res;
    }));
  return { error, isUnique };
};

const checkForErrors = async function (reqBody) {
  let errors = {};

  for (let field of Object.keys(reqBody)) {
    if (reqBody[field] === "") {
      errors = { ...errors, [field]: "This field is required." };
    }
    if (field === "userId") {
      const value = reqBody[field];
      const { error, isValid } = await checkUserValid(field, value);
      if (!isValid) {
        errors = { ...errors, ...error };
      }
    }
    if (field === "ltId") {
      const value = reqBody[field];
      const { error, isValid } = await checkLTValid(field, value);
      if (!isValid) {
        errors = { ...errors, ...error };
      }
    }
    if (field === "startDate" && !dateIsValid(reqBody[field])) {
      errors = { ...errors, [field]: "Password is too short. " };
    }
    if (field === "endDate" && !dateIsValid(reqBody[field])) {
      errors = { ...errors, [field]: "Passwords does not match. " };
    }
    if (
      field === "it_req" &&
      (reqBody[field] === true || reqBody[field] === false)
    ) {
      errors = { ...errors, [field]: "Incorrect choice for IT requirements" };
    }
  }
  return errors;
};

module.exports = {
  makeBooking: async (req, res) => {
    const userId = req.body.userId || "";
    const ltId = req.body.ltId || "";
    const purpose = req.body.purpose || "";
    const startDate = req.body.startDate || "";
    const endDate = req.body.startDate || "";
    const batch = req.body.batch || "";
    const it_req = req.body.it_req || "";

    const reqBody = {
      userId,
      ltId,
      purpose,
      startDate,
      endDate,
      batch,
      it_req,
    };

    const errors = await checkForErrors(reqBody);

    if (Object.keys(errors).length > 0) {
      res.json({ message: "Invalid Inputs", errors });
    } else {
    }
  },
};
