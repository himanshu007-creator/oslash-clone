export const MainRouter = require("express").Router();
import { verifyToken } from "../middlewares/verify";
import { mainLink } from "../controllers/link";

MainRouter.get("/:id", verifyToken, mainLink);
