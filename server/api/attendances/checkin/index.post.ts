import { Attendance } from "~/server/models/attendance";
import { Shift } from "~/server/models/shift";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user) throw new Error("not authed");
  const { shiftId } = await readBody(event);
  const shift = await Shift.findById(shiftId);
  if (shift?.tutorId.toString() !== user?.id) {
    throw new Error("not authed");
  }

  await Attendance.create({ checkinTime: new Date(), shiftId });

  return { message: "done" };
});
