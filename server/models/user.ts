import { model, Schema } from "mongoose";
import { ROLE } from "./role.enum";
import { Attendance } from "./attendance";

interface IShift {
  from: Date;
  until: Number;
  day: string;
}
export interface IUser {
  _id?: string;
  email: string;
  name?: string;
  shifts: IShift[];
  picture?: string;
  role: ROLE;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  picture: String,
  role: String,
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

userSchema.virtual("shifts", {
  ref: "Shift",
  localField: "_id",
  foreignField: "tutorId",
});

export const User = model<IUser>("User", userSchema);
