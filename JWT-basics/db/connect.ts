import * as mongoose from "mongoose";
import config from "../config";


export default function connectDB() {
  return mongoose.connect(config.mongodb.MONGO_URI);
}
