const express = require("express");
const {
  registerallusers,
  loginController,logoutController,updateUser,UserDetails,adminLoginController
} = require("../controller/user.controller");
const auth  = require("../middleware/auth");
const jwt = require("jsonwebtoken");


const userRouter = express.Router();

userRouter.post("/register", registerallusers);

userRouter.get("/details", auth,UserDetails);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth,logoutController);
userRouter.put("/update-Details", auth,updateUser);
userRouter.post("/admin-login", adminLoginController);


module.exports = userRouter;
