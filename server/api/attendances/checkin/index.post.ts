import { Attendance } from "~/server/models/attendance";
import { Shift } from "~/server/models/shift";

export default defineEventHandler(async (event) => {
  const { shiftId } = await readBody(event);
  const checkinTime = new Date();
  await Attendance.create({ checkinTime, shiftId });
  await Shift.findByIdAndUpdate(shiftId, { isCheckingIn: true });

  return new Response("ok");
});
