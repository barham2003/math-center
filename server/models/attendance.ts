import mongoose, { model, Schema } from "mongoose";
export interface IAttendance {
  checkinTime: Date;
  checkoutTime: Date;
  shiftId: mongoose.Types.ObjectId;
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

export const Attendance = model<IAttendance>("Attendance", attendanceSchema);
