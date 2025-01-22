import mongoose, { model, Schema } from "mongoose";
import convertNumberToTime from "~/utils/convertNumberToTime";
import { IAttendance } from "./attendance";
interface IShift {
  from: number;
  until: number;
  day: string;
  isCheckingIn: boolean;
  attendances?: IAttendance[];
}

const shiftSchema = new Schema({
  from: { type: Number, required: true },
  until: { type: Number, required: true },
  day: { type: String, required: true },
  isCheckingIn: { type: Boolean, default: false },
  tutorId: { type: mongoose.Types.ObjectId, ref: "Tutor", required: true },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

shiftSchema.virtual("fromTime").get(function () {
  return convertNumberToTime(this.from);
});

shiftSchema.virtual("untilTime").get(function () {
  return convertNumberToTime(this.until);
});

shiftSchema.virtual("tutor", {
  ref: "User",
  localField: "tutorId",
  foreignField: "_id",
  justOne: true,
});
shiftSchema.virtual("attendances", {
  ref: "Attendance",
  localField: "_id",
  foreignField: "shiftId",
});

shiftSchema.virtual("todayAttendance", {
  ref: "Attendance",
  localField: "_id",
  foreignField: "shiftId",
  justOne: true,
  match: function () {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    return {
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    };
  },
});

export const Shift = model<IShift>("Shift", shiftSchema);
