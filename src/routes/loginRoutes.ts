export const router = require("express").Router();
import {
  loginUser,
  registerUser,
  generateToken,
  logout,
} from "../controllers/authuser";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/token", generateToken);
router.delete("/logout", logout);
