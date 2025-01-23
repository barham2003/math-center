import { Attendance } from "~/server/models/attendance";
import { ROLE } from "~/server/models/role.enum";
import { Shift } from "~/server/models/shift";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event);
    if (!user || user.role !== ROLE.ADMIN) throw new Error("not authed");
    const tutorId = event?.context?.params?.id;
    await User.findByIdAndDelete(tutorId);
    const shifts = await Shift.find({ tutorId });

    shifts.forEach(async (shift) => {
      await shift.deleteOne();
      await Attendance.deleteMany({ shiftId: shift._id });
    });
  } catch (e) {
    console.log(e);
    return new Response('{"message": "wrong"}', { status: 400 });
  }
  return {
    message: "DONE",
    status: "success",
  };
});
