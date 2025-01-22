import { Attendance } from "~/server/models/attendance";
import { Shift } from "~/server/models/shift";
import getToday from "~/utils/getToday";

export default defineEventHandler(async (event) => {
  await Attendance.init();
  const day = getToday();
  const currentShifts = await Shift
    .find({ day })
    .populate("attendances")
    .populate("tutor")
    .populate("todayAttendance")
    .exec();

  return currentShifts;
});
