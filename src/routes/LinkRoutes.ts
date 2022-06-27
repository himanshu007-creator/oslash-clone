export const Linkrouter = require("express").Router();
import { verifyToken } from "../middlewares/verify";
import {
  createUrl,
  getLinks,
  deleteLink,
  searchLinks,
} from "../controllers/link";
Linkrouter.post("/create", verifyToken, createUrl);
Linkrouter.get("/links", verifyToken, getLinks);
Linkrouter.delete("/delete/:short", verifyToken, deleteLink);
Linkrouter.get("/search", verifyToken, searchLinks);
