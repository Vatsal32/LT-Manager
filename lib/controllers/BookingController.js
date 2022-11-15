const UserModel = require("../models/UsersModel");
const RoomModel = require("../models/RoomModel");
const ObjectId = require("mongodb").ObjectId;
const BookingsModel = require("../models/BookingsModel");
function dateIsValid(date) {
  const isValid = new Date(date);
  return isValid instanceof Date && !isNaN(isValid);
}
const checkUserValid = async (field, value) => {
  let error, isUnique;
  ({
    error,
    isUnique
  } = await UserModel.findOne({
    _id: value
  }).exec().then(user => {
    let res = {};
    if (!user) {
      res = {
        error: {
          [field]: `This ${value} is not available. `
        },
        isValid: false
      };
    } else {
      res = {
        error: {
          [field]: ""
        },
        isValid: true
      };
    }
    return res;
  }));
  return {
    error,
    isUnique
  };
};
const checkLTValid = async (field, value) => {
  let error, isUnique;
  ({
    error,
    isUnique
  } = await RoomModel.findOne({
    _id: value
  }).exec().then(user => {
    let res = {};
    if (!user) {
      res = {
        error: {
          [field]: `This ${value} is not available. `
        },
        isValid: false
      };
    } else {
      res = {
        error: {
          [field]: ""
        },
        isValid: true
      };
    }
    return res;
  }));
  return {
    error,
    isUnique
  };
};
const checkForErrors = async function (reqBody) {
  let errors = {};
  for (let field of Object.keys(reqBody)) {
    if (reqBody[field] === "") {
      errors = {
        ...errors,
        [field]: "This field is required."
      };
    }
    if (field === "bookId" && reqBody[field] === "" && reqBody[field] !== "N/A" && ObjectId.isValid(reqBody[field])) {
      const value = reqBody[field];
      const {
        error,
        isValid
      } = await checkUserValid(field, value);
      if (!isValid) {
        errors = {
          ...errors,
          ...error
        };
      }
    }
    if (field === "userId" && reqBody[field] === "" && reqBody[field] !== "N/A" && ObjectId.isValid(reqBody[field])) {
      const value = reqBody[field];
      const {
        error,
        isValid
      } = await checkUserValid(field, value);
      if (!isValid) {
        errors = {
          ...errors,
          ...error
        };
      }
    }
    if (field === "ltId" && reqBody[field] === "" && reqBody[field] !== "N/A" && ObjectId.isValid(reqBody[field])) {
      const value = reqBody[field];
      const {
        error,
        isValid
      } = await checkLTValid(field, value);
      if (!isValid) {
        errors = {
          ...errors,
          ...error
        };
      }
    }
    if (field === "startDate" && !dateIsValid(reqBody[field])) {
      errors = {
        ...errors,
        [field]: `Invalid start Date ${!dateIsValid(reqBody[field])}`
      };
    }
    if (field === "endDate" && !dateIsValid(reqBody[field])) {
      errors = {
        ...errors,
        [field]: "Invalid end date. "
      };
    }
    if (field === "it_req" && reqBody[field] !== true && reqBody[field] !== false) {
      errors = {
        ...errors,
        [field]: "Incorrect choice for IT requirements"
      };
    }
  }
  return errors;
};
const checkConflictDates = async (ltId, std, etd) => {
  const startDate = new Date(std);
  const endDate = new Date(etd);
  return BookingsModel.find({
    ltId
  }).where({
    $and: [{
      startDate: {
        $lte: endDate.toISOString()
      }
    }, {
      endDate: {
        $gte: startDate.toISOString()
      }
    }]
  }).then(data => {
    return data;
  }).catch(err => {
    console.log(err);
    return {
      errors: "Something went wrong."
    };
  });
};
module.exports = {
  getTimetable: async (req, res) => {
    let cur = new Date(req.body.date);
    let first = cur.getDate() - cur.getDay();
    let last = first + 6;
    cur = new Date(cur.setDate(first));
    const startDate = cur.toISOString();
    cur = new Date(cur.setDate(last));
    const endDate = cur.toISOString();
    BookingsModel.find({
      $and: [{
        startDate: {
          $lte: endDate
        }
      }, {
        endDate: {
          $gte: startDate
        }
      }]
    }).then(result => {
      res.json({
        message: "success",
        data: result
      });
    }).catch(err => {
      console.log(err);
      res.json({
        errors: "something went wrong"
      });
    });
  },
  makeBooking: async (req, res) => {
    const bookId = req.body.bookId || "N/A";
    const userId = req.body.userId || "";
    const ltId = req.body.ltId || "";
    const purpose = req.body.purpose || "";
    let startDate = req.body.startDate || "";
    let endDate = req.body.endDate || "";
    const batch = req.body.batch || "";
    const it_req = req.body.it_req === "false" ? false : true || "";
    const reqBody = {
      bookId,
      userId,
      ltId,
      purpose,
      startDate,
      endDate,
      batch,
      it_req
    };
    const errors = await checkForErrors(reqBody);
    if (Object.keys(errors).length > 0) {
      res.json({
        message: "Invalid Inputs",
        errors
      });
    } else {
      const times = [{
        monST: req.body.monST + 1 || -1,
        monET: req.body.monET || -1
      }, {
        tueST: req.body.tueST + 1 || -1,
        tueET: req.body.tueET || -1
      }, {
        wedST: req.body.wedST + 1 || -1,
        wedET: req.body.wedET || -1
      }, {
        thuST: req.body.thuST + 1 || -1,
        thuET: req.body.thuET || -1
      }, {
        friST: req.body.friST + 1 || -1,
        friET: req.body.friET || -1
      }, {
        satST: req.body.satST + 1 || -1,
        satET: req.body.satET || -1
      }, {
        sunST: req.body.sunST + 1 || -1,
        sunET: req.body.sunET || -1
      }];
      const newBooking = new BookingsModel({
        userId,
        ltId,
        purpose,
        startDate,
        endDate,
        batch,
        it_req,
        superAdmin: req.superAdmin || false
      });
      let errors = {};
      for (let dayTime of times) {
        const datas = await checkConflictDates(ltId, startDate, endDate);
        const fields = Object.keys(dayTime);
        if (datas === []) {
          newBooking[fields[0]] = dayTime[fields[0]];
          newBooking[fields[1]] = dayTime[fields[1]];
          continue;
        } else if (datas.errors) {
          res.json({
            errors: datas.errors
          });
        } else {
          for (let data of datas) {
            const left1 = data[fields[0]],
              left2 = dayTime[fields[0]];
            const right1 = data[fields[1]],
              right2 = dayTime[fields[1]];
            let f = true;
            if (left1 === -1 && left2 === -1 && right1 === -1 && right2 === -1) {
              f = false;
            } else {
              if (left1 <= right2 && left2 <= right1) {
                f = false;
                console.log("ERROR HERE");
                errors = {
                  ...errors,
                  slots: "Slots already occupied"
                };
              }
            }
            if (f) {
              newBooking[fields[0]] = dayTime[fields[0]];
              newBooking[fields[1]] = dayTime[fields[1]];
            }
          }
        }
      }
      if (Object.keys(errors).length > 0) {
        res.json({
          errors
        });
      } else {
        newBooking.save().then(res.json({
          message: "success"
        })).catch(err => {
          console.log(err);
          res.json({
            errors: "Something went wrong"
          });
        });
      }
    }
  },
  updateBooking: async (req, res) => {
    const bookId = req.body.bookId || "";
    const ltId = req.body.ltId || "N/A";
    let startDate = req.body.startDate || "";
    let endDate = req.body.endDate || "";
    const reqBody = {
      bookId,
      userId: "N/A",
      ltId,
      startDate,
      endDate,
      it_req: true
    };
    const errors = await checkForErrors(reqBody);
    if (Object.keys(errors).length > 0) {
      res.json({
        errors
      });
    } else {
      const times = [{
        monST: req.body.monST + 1 || -1,
        monET: req.body.monET || -1
      }, {
        tueST: req.body.tueST + 1 || -1,
        tueET: req.body.tueET || -1
      }, {
        wedST: req.body.wedST + 1 || -1,
        wedET: req.body.wedET || -1
      }, {
        thuST: req.body.thuST + 1 || -1,
        thuET: req.body.thuET || -1
      }, {
        friST: req.body.friST + 1 || -1,
        friET: req.body.friET || -1
      }, {
        satST: req.body.satST + 1 || -1,
        satET: req.body.satET || -1
      }, {
        sunST: req.body.sunST + 1 || -1,
        sunET: req.body.sunET || -1
      }];
      let errors = {};
      let updates = {
        startDate,
        endDate
      };
      if (ltId !== "N/A") {
        updates = {
          ...updates,
          ltId: ObjectId(ltId)
        };
      }
      await BookingsModel.findOne({
        _id: ObjectId(bookId)
      }).then(async result => {
        if (result === null) {
          console.log(result);
          errors = {
            ...errors,
            bookId: "Booking Doesn't exists"
          };
        } else {
          for (let dayTime of times) {
            const datas = await checkConflictDates(result.ltId, startDate, endDate);
            const fields = Object.keys(dayTime);
            if (datas === []) {
              updates = {
                ...updates,
                [fields[0]]: dayTime[fields[0]],
                [fields[1]]: dayTime[fields[1]]
              };
              continue;
            } else if (datas.errors) {
              res.json({
                errors: datas.errors
              });
            } else {
              for (let data of datas) {
                if (data._id.toString() === bookId) {
                  continue;
                }
                const left1 = data[fields[0]],
                  left2 = dayTime[fields[0]];
                const right1 = data[fields[1]],
                  right2 = dayTime[fields[1]];
                let f = true;
                if (left1 === -1 && left2 === -1 && right1 === -1 && right2 === -1) {
                  f = false;
                } else if (left1[fields[0]] !== -1 && right1[fields[0]] !== -1 && left2 === -1 && right2 === -1) {
                  updates = {
                    ...updates,
                    [fields[0]]: data[fields[0]],
                    [fields[1]]: data[fields[1]]
                  };
                } else {
                  if (left1 <= right2 && left2 <= right1) {
                    f = false;
                    console.log("ERROR HERE");
                    errors = {
                      ...errors,
                      slots: "Slots already occupied"
                    };
                  }
                }
                if (f) {
                  updates = {
                    ...updates,
                    [fields[0]]: dayTime[fields[0]],
                    [fields[1]]: dayTime[fields[1]]
                  };
                }
              }
            }
          }
        }
      }).catch(err => {
        console.log(err);
        res.json({
          errors: "something went wrong"
        });
      });
      if (Object.keys(errors).length > 0) {
        res.json({
          errors
        });
      } else {
        BookingsModel.findOneAndUpdate({
          _id: ObjectId(bookId)
        }, {
          ...updates
        }).exec().then(res.json({
          message: "success"
        })).catch(err => {
          console.log(err);
          res.json({
            errors: "Something went wrong"
          });
        });
      }
    }
  },
  deleteBooking: async (req, res) => {
    const userName = req.body.userName || "";
    if (userName !== "") {
      BookingsModel.findOneAndDelete({
        userName
      }).then(data => {
        if (data === null) {
          res.json({
            errors: {
              userName: "Doesn't Exists."
            }
          });
        } else {
          res.json({
            message: "success"
          });
        }
      }).catch(err => {
        console.log(err);
        res.json({
          errors: "Something went wrong"
        });
      });
    } else {
      res.json({
        errors: {
          userName: "Enter a valid ID"
        }
      });
    }
  },
  rejectBooking: async (req, res) => {
    const bookId = req.body.bookId || "";
    if (ObjectId.isValid(bookId)) {
      BookingsModel.findOne({
        _id: ObjectId(bookId)
      }).then(result => {
        if (result === null) {
          res.json({
            errors: "No such booking"
          });
        } else if (result.admin1 && result.admin2 && result.admin3 || result.superAdmin) {
          res.json({
            errors: "Already Approved"
          });
        } else {
          result.remove().then(() => {
            res.json({
              message: "success"
            });
          });
        }
      }).catch(err => {
        console.log(err);
        res.json({
          errors: "Something went wrong."
        });
      });
    } else {
      res.json({
        errors: {
          bookId: "Invalid booking ID"
        }
      });
    }
  },
  approveBooking: async (req, res) => {
    const bookId = req.body.bookId || "";
    let admin = {};
    let admin1 = {};
    if (req.admin1) {
      admin = {
        admin1: false
      };
      admin1 = {
        admin1: true
      };
    } else if (req.admin2) {
      admin = {
        admin2: false
      };
      admin1 = {
        admin2: true
      };
    } else if (req.admin3) {
      admin = {
        admin3: false
      };
      admin1 = {
        admin3: true
      };
    } else if (req.superAdmin) {
      admin = {
        superAdmin: false
      };
      admin1 = {
        superAdmin: true
      };
    }
    if (ObjectId.isValid(bookId)) {
      BookingsModel.findOneAndUpdate({
        _id: ObjectId(bookId),
        ...admin
      }, {
        ...admin1
      }).then(result => {
        if (result === null) {
          res.json({
            errors: "No such booking to approve"
          });
        } else {
          res.json({
            message: "success"
          });
        }
      }).catch(err => {
        console.log(err);
        res.json({
          errors: "Something went wrong"
        });
      });
    } else {
      res.json({
        errors: {
          bookId: "Invalid booking ID"
        }
      });
    }
  }
};