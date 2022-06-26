import mongoose from "mongoose";
import config from "../config/config";

async function db() {
  const dbUri = config.dbUri as string;
  try {
    await mongoose.connect(dbUri).then(() => {
      console.log(`DB connected successfully}`);
    });
  } catch (e) {
    console.error(e);
  }
}

export default db;
