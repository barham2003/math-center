import { connect } from "mongoose";

export default defineNitroPlugin(() => {
  connect("mongodb://localhost:27017/mathcenter").then(() => {
    console.log("MongoDB connected");
  }).catch((e) => {
    console.log("MongoDB connection error");
  });
});
