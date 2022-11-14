const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UsersModel");
const BookingController = require("./BookingController");
const ObjectId = require("mongodb").ObjectId;

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkUserUniqueness = async (field, value) => {
  let error, isUnique;
  ({ error, isUnique } = await UserModel.findOne({ [field]: value })
    .exec()
    .then((user) => {
      let res = {};
      if (user) {
        res = {
          error: { [field]: `This ${value} is not available. ` },
          isUnique: false,
        };
      } else {
        res = { error: { [field]: "" }, isUnique: true };
      }
      return res;
    }));
  return { error, isUnique };
};

const checkForErrors = async function (reqBody) {
  const password = reqBody["password"];
  const confirmPassword = reqBody["confirmPassword"];

  let errors = {};
  const phoneNumRegex = /^[0-9]{10}$/;
  for (let field of Object.keys(reqBody)) {
    if (reqBody[field] === "") {
      errors = { ...errors, [field]: "This field is required." };
    }
    if (field === "userName" || field === "email") {
      const value = reqBody[field];
      const { error, isUnique } = await checkUserUniqueness(field, value);
      if (!isUnique) {
        errors = { ...errors, ...error };
      }
    }
    if (field === "email" && !validateEmail(reqBody[field])) {
      errors = { ...errors, [field]: "Not a valid email. " };
    }
    if (field === "password" && password !== "" && password.length < 6) {
      errors = { ...errors, [field]: "Password is too short. " };
    }
    if (field === "confirmPassword" && confirmPassword !== password) {
      errors = { ...errors, [field]: "Passwords does not match. " };
    }
    if (field === "phoneNum" && !phoneNumRegex.test(String(reqBody[field]))) {
      errors = { ...errors, [field]: "Invalid Phone Number. " };
    }
  }
  return errors;
};

module.exports = {
  register: async (req, res) => {
    const name = req.body.name || "";
    const userName = req.body.userName || "";
    const email = req.body.email || "";
    const password = req.body.password || "";
    const confirmPassword = req.body.confirmPassword || "";
    const phoneNum = req.body.phoneNum || "";
    const reqBody = {
      name,
      userName,
      email,
      password,
      confirmPassword,
      phoneNum,
    };

    let errors = await checkForErrors(reqBody);
    if (Object.keys(errors).length > 0) {
      res.json({ message: "Incorrect Inputs", errors });
    } else {
      const newUser = new UserModel({
        name,
        userName,
        email,
        phoneNum,
        password,
        admin: false,
        superAdmin: false,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return err;
        } else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return err;
            } else {
              newUser.password = hash;
              newUser
                .save()
                .then(() => {
                  res.json({
                    message: "Success",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.json({ errors: "Something went wrong" });
                });
            }
          });
        }
      });
    }
  },

  authenticate: async (req, res) => {
    const userName = req.body.userName || "";
    const password = req.body.password || "";

    let errors = {};

    if (userName === "") {
      errors = { ...errors, userName: "This is required field. " };
    }
    if (password === "") {
      errors = { ...errors, password: "This is required field. " };
    }

    if (Object.keys(errors).length > 0) {
      res.json({ errors });
    } else {
      UserModel.findOne({ userName: userName }, (err, userInfo) => {
        if (err) {
          res.json({ errors: "Something went wrong" });
          return err;
        }
        if (userInfo) {
          bcrypt.compare(password, userInfo.password, (err, isMatch) => {
            if (err) {
              console.log(err);
              return err;
            }
            if (isMatch) {
              const token = jwt.sign(
                {
                  userId: userInfo._id,
                  name: userInfo.name,
                  admin1: userInfo.userName === "admin1",
                  admin2: userInfo.userName === "admin2",
                  admin3: userInfo.userName === "admin3",
                  superAdmin: userInfo.superAdmin,
                },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
              );
              res.json({
                message: "User signed in successfully. ",
                data: { token: token },
              });
            } else {
              res.json({
                errors: { userName: "", password: "Invalid Password. " },
              });
            }
          });
        } else {
          res.json({
            errors: { userName: "Username does not exists. ", password: "" },
          });
        }
      });
    }
  },

  isAuthenticated: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      res.status(403).json({ errors: "No token provided." });
    } else {
      const authHeader = req.headers["authorization"];
      const authToken = authHeader.split(" ")[1];

      if (authToken) {
        jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            console.log(err);
            res.status(401).json({ errors: "Failed to authenticate. " });
          } else {
            req.userId = decoded.userId;
            next();
          }
        });
      } else {
        res.status(403).json({ errors: "No token provided." });
      }
    }
  },

  isAdmin: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      res.status(403).json({ errors: "No token provided." });
    } else {
      const authHeader = req.headers["authorization"];
      const authToken = authHeader.split(" ")[1];

      if (authToken) {
        jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            console.log(err);
            res.status(401).json({ error: "Failed to authenticate. " });
          } else {
            req.userId = decoded.userId;
            req.admin1 = decoded.admin1;
            req.admin2 = decoded.admin2;
            req.admin3 = decoded.admin3;
            req.superAdmin = decoded.superAdmin;
            if (decoded.admin1 || decoded.admin2 || decoded.admin3) {
              next();
            } else {
              res.json({ errors: "Not an Admin" });
            }
          }
        });
      } else {
        res.status(403).json({ errors: "No token provided." });
      }
    }
  },

  isSuperAdmin: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      res.status(403).json({ errors: "No token provided." });
    } else {
      const authHeader = req.headers["authorization"];
      const authToken = authHeader.split(" ")[1];

      if (authToken) {
        jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            console.log(err);
            res.status(401).json({ errors: "Failed to authenticate. " });
          } else {
            req.userId = decoded.userId;
            req.admin1 = false;
            req.admin2 = false;
            req.admin3 = false;
            req.superAdmin = decoded.superAdmin;
            if (decoded.superAdmin) {
              next();
            } else {
              res.json({ errors: "Not a Superadmin." });
            }
          }
        });
      } else {
        res.status(403).json({ errors: "No token provided." });
      }
    }
  },

  isSuper: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      res.status(403).json({ errors: "No token provided." });
    } else {
      const authHeader = req.headers["authorization"];
      const authToken = authHeader.split(" ")[1];

      if (authToken) {
        jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            console.log(err.name);
            if (err.name === "TokenExpiredError") {
              res.json({errors: "Session Expired."});
            } else {
              res.status(401).json({ errors: "Failed to authenticate. " });
            }
          } else {
            req.userId = decoded.userId;
            req.admin1 = decoded.admin1;
            req.admin2 = decoded.admin2;
            req.admin3 = decoded.admin3;
            req.superAdmin = decoded.superAdmin;
            if (decoded.superAdmin || (decoded.admin1 || decoded.admin2 || decoded.admin3)) {
              next();
            } else {
              res.json({ errors: "Not a Superadmin or Admin." });
            }
          }
        });
      } else {
        res.status(403).json({ errors: "No token provided." });
      }
    }
  },

  deleteUser: async (req, res) => {
    const userName = req.body.userName || "";

    if (userName === "") {
      res.json({
        message: "Invalid Input",
        errors: { userId: "This field cannot be empty" },
      });
    } else {
      if (req.admin || req.superAdmin) {
        UserModel.findOneAndDelete({ userName }, (err, data) => {
          if (err) {
            console.log("Err", err);
          } else {
            if (data === null) {
              res.json({ errors: "User not found" });
            } else {
              res.json({
                message: `User ${data.userName} deleted successfully.`,
              });
            }
          }
        });
      } else {
        res.json({ errors: "Unauthorized Access" });
      }
    }
  },

  isOwnerOf: async (req, res, next) => {
    const bookId = req.body.bookId || "";

    BookingController.findOne({_id: ObjectId(bookId)}).then((result) => {
      if (result === null) {
        res.json({errors: "Booking doesn't exists"});
      } else {
        if (req.userId === result._id.toString()) {
          next();
        } else {
          res.json({
            errors: "You don't have rights to update the booking",
          });
        }
      }
    });
  }
};
