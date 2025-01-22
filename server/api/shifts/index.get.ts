import { Attendance } from "~/server/models/attendance";
import { ROLE } from "~/server/models/role.enum";
import { Shift } from "~/server/models/shift";
import getToday from "~/utils/getToday";

export default defineEventHandler(async (event) => {
  await Attendance.init();
  const { user } = await requireUserSession(event);
  if (!user) sendRedirect(event, "/", 307);

  let shiftQuery: any = Shift;
  const day = getToday();

  if (user.role === ROLE.TUTOR) {
    const tutorId = user.id;
    shiftQuery = Shift.find({ tutorId, day });
  } else if (user.role === ROLE.ADMIN) {
    shiftQuery = Shift.find({ day })
      .populate("tutor");
  }

  const currentShifts = await shiftQuery
    .populate("todayAttendance")
    .exec();

  return currentShifts;
});
