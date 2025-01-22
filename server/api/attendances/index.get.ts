import { Attendance } from "~/server/models/attendance";

export default defineEventHandler(async (event) => {
  const attendances = await Attendance.find({});
  console.log(attendances);
  return attendances;
});
