export const AuthRouter = require("express").Router();
import {
  loginUser,
  registerUser,
  generateToken,
  logout,
} from "../controllers/authuser";

AuthRouter.post("/login", loginUser);
AuthRouter.post("/register", registerUser);
AuthRouter.post("/token", generateToken);
AuthRouter.delete("/logout", logout);
