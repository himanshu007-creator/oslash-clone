export const Statsrouter = require("express").Router();
import { urlStats } from "../controllers/urlAnalytics";
import { verifyToken } from "../middlewares/verify";

Statsrouter.get("/stats", verifyToken, urlStats);
