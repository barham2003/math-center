import { Attendance } from "~/server/models/attendance";
import { ROLE } from "~/server/models/role.enum";
import { Shift } from "~/server/models/shift";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user || user.role !== ROLE.ADMIN) throw new Error("not authed");
  const { shiftId } = await readBody(event);
  await Attendance.deleteMany({ shiftId });
  await Shift.findByIdAndDelete(shiftId);
});
