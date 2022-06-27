import bodyParser from "body-parser";
import express from "express";
import config from "../config/config";
import db from "./db";
import cors from "cors";
import { router } from "./routes/loginRoutes";
import { Statsrouter } from "./routes/analyticsRoute";
import { Linkrouter } from "./routes/LinkRoutes";
import { Mainouter } from "./routes/MainRouter";
const app = express();
app.use(
  cors({
    origin: config.corsOrigin,
  })
);
app.use(bodyParser.json());

const port = config.port;
app.listen(port, () => {
  console.log(port);
  db();

  // auth routes
  app.use("/o", Mainouter);
  app.use("/api/auth", router);
  app.use("/api/performance", Statsrouter);
  app.use("/api/user", Linkrouter);
});
