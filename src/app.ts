import bodyParser from "body-parser";
import express from "express";
import config from "../config/config";
import db from "./db";
import cors from "cors";
import { AuthRouter } from "./routes/loginRoutes";
import { Statsrouter } from "./routes/analyticsRoute";
import { Linkrouter } from "./routes/LinkRoutes";
import { MainRouter } from "./routes/MainRouter";
const app = express();
app.use(
  cors({
    origin: config.corsOrigin,
  })
);
app.use(bodyParser.json());

app.listen(config.port, () => {
  console.log(`Server started @port:${config.port}`);
  db();

  // auth routes
  app.use("/o", MainRouter);
  app.use("/api/auth", AuthRouter);
  app.use("/api/performance", Statsrouter);
  app.use("/api/user", Linkrouter);
});
