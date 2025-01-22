import { Shift } from "~/server/models/shift";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const _id = event?.context?.params?.id;
    await User.findByIdAndDelete(_id);
    const shifts = await Shift.find({ tutorId: _id });

    shifts.forEach(async (shift) => {
      await shift.deleteOne();
    });
  } catch (e) {
    console.log(e);
    return new Response('{wrong: "wrong"}', { status: 400 });
  }
  return {
    message: "DONE",
    status: "success",
  };
});
