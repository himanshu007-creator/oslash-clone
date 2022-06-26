export const Linkrouter = require("express").Router();
import { verifyToken } from "../middlewares/verify";
import {
  createUrl,
  getLinks,
  deleteLink,
  searchLinks,
  mainLink,
} from "../controllers/link";
Linkrouter.get("/:id", verifyToken, mainLink);
Linkrouter.post("/create", verifyToken, createUrl);
Linkrouter.get("/links", verifyToken, getLinks);
Linkrouter.delete("/delete", verifyToken, deleteLink);
Linkrouter.post("/search", verifyToken, searchLinks);
