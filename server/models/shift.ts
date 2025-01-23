import mongoose, { Model, model, Schema } from "mongoose";
import convertNumberToTime from "~/utils/convertNumberToTime";
import { IAttendance } from "./attendance";
import { IUser } from "./user";

export interface IShift {
  from: number;
  until: number;
  day: string;
  attendances?: IAttendance[];
  tutor?: IUser;
  tutorId: mongoose.Types.ObjectId;
  fromTime: string;
  untilTime: string;
  findAbsents(startDate: Date, endDate: Date): IAbsent[];
}

export interface IAbsent {
  tutor: IUser;
  fromTime: string;
  untilTime: string;
  day: string;
  date: Date;
}

interface IShiftModel extends Model<IShift> {
  findAbsents(
    startDate: Date,
    endDate: Date,
    tutorId?: string | undefined,
  ): Promise<IAbsent[]>;
}

const shiftSchema = new Schema({
  from: { type: Number, required: true },
  until: { type: Number, required: true },
  day: { type: String, required: true },
  tutorId: { type: mongoose.Types.ObjectId, ref: "Tutor", required: true },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
  statics: {},
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

shiftSchema.statics.findAbsents = async function (
  startDate: Date,
  endDate: Date,
  tutorId?: string | undefined,
) {
  let shifts: IShift[] = [];
  if (tutorId) {
    shifts = await this
      .find({ tutorId })
      .populate("attendances")
      .populate({ path: "tutor" });
  } else {
    shifts = await this
      .find({})
      .populate("attendances")
      .populate({ path: "tutor" });
  }

  const absents: IAbsent[] = [];

  const days = getDaysInBetween(startDate, endDate);
  days.forEach((currentDate) => {
    const weekDay = currentDate
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();

    shifts
      .filter((shift) => shift.day === weekDay)
      .forEach((shift) => {
        const isAttended = shift.attendances?.find((attendance) =>
          currentDate.toLocaleDateString() ===
          new Date(attendance.checkinTime).toLocaleDateString()
        );
        if (!isAttended && shift) {
          absents.push({
            tutor: shift.tutor as IUser,
            date: currentDate,
            fromTime: shift.fromTime,
            untilTime: shift.untilTime,
            day: shift.day,
          });
        }
      });
  });

  absents.sort((a, b) => b.date.getTime() - a.date.getTime());

  return absents;
};

function getDaysInBetween(start: Date, end: Date) {
  const days = [];
  let current = new Date(start);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export const Shift = model<IShift, IShiftModel>("Shift", shiftSchema);
