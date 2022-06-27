export const Mainouter = require("express").Router();
import { verifyToken } from "../middlewares/verify";
import { mainLink } from "../controllers/link";

Mainouter.get("/:id", verifyToken, mainLink);
