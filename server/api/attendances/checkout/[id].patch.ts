import { Attendance } from "~/server/models/attendance";
import { Shift } from "~/server/models/shift";

export default defineEventHandler(async (event) => {
  const attendanceId = event?.context?.params?.id;
  const { user } = await requireUserSession(event);
  if (!user) throw new Error("not authed");

  const attendance = await Attendance
    .findById(attendanceId)
    .populate("shift");

  const shift = attendance?.shift;
  if (shift?.tutorId.toString() !== user?.id) {
    throw new Error("not authed");
  }

  await Attendance.findOneAndUpdate({ _id: attendanceId }, {
    checkoutTime: new Date(),
  });
  return { message: "done" };
});
