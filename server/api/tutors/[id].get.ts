import { Shift } from "~/server/models/shift";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const id = event?.context?.params?.id;

    await Shift.findOne();
    const tutor = await User.findById(id).populate("shifts");

    if (tutor) {
      return { tutor, status: "success" };
    } else {
      return { message: "Tutor not found", status: "fail" };
    }
  } catch (e) {
    console.log(e);
    return { message: "Tutor not found", status: "fail" };
  }
});
