import mongoose, { model, Schema } from "mongoose";
import type { IShift } from "./shift";

export interface IAttendance {
  checkinTime: Date;
  checkoutTime: Date;
  shiftId: mongoose.Types.ObjectId;
  shift?: IShift;
}

const attendanceSchema = new Schema({
  checkinTime: { type: Date, required: true },
  checkoutTime: { type: Date },
  shiftId: { type: mongoose.Types.ObjectId, ref: "Shift", required: true },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

attendanceSchema.virtual("shift", {
  ref: "Shift",
  localField: "shiftId",
  foreignField: "_id",
  justOne: true,
});

export const Attendance = model<IAttendance>("Attendance", attendanceSchema);
