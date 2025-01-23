import { Attendance } from "~/server/models/attendance";
import { ROLE } from "~/server/models/role.enum";
import { Shift } from "~/server/models/shift";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user) throw new Error("Not authenticated");

  let shiftQuery = Shift;

  const query = getQuery(event);
  const dateQuery = query.date as string;

  const date = dateQuery ? new Date(dateQuery) : new Date();

  const day = date
    .toLocaleString("en-US", { weekday: "short" })
    .toLowerCase();

  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
  );

  const attendances = await Attendance.find({
    createdAt: { $gte: startOfDay, $lt: endOfDay },
  });

  let executableShiftQuery;

  if (user?.role === ROLE.TUTOR) {
    const tutorId = user.id;
    executableShiftQuery = shiftQuery
      .find({ tutorId, day });
  } else if (user?.role === ROLE.ADMIN) {
    executableShiftQuery = shiftQuery
      .find({ day })
      .populate("tutor");
  }

  const currentShifts = await executableShiftQuery?.sort({ from: 1 });

  const artificialShifts = currentShifts?.map((shift) => {
    const attendance = attendances.find((attendance) =>
      attendance.shiftId.toString() === shift._id.toString()
    );

    if (attendance) {
      return {
        tutor: shift.tutor,
        fromTime: shift.fromTime,
        untilTime: shift.untilTime,
        until: shift.until,
        day: shift.day,
        attendance: attendance,
      };
    } else {
      return shift;
    }
  });

  return artificialShifts;
});
