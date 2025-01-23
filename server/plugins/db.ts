import { connect } from "mongoose";
import "dotenv/config";
import process from "process";

// const deff = "mongodb://localhost:27017/mathcenter";
export default defineNitroPlugin(() => {
  if (!process.env.MONGO_URL) throw new Error("NO DB");
  connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
  }).catch((e) => {
    console.log("MongoDB connection error");
  });
});
