import { ROLE } from "~/server/models/role.enum";
import { Shift } from "~/server/models/shift";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user || user.role !== ROLE.ADMIN) throw new Error("Not Authed");

  const id = event?.context?.params?.id;

  await Shift.findOne();
  const tutor = await User.findById(id).populate("shifts");

  return { tutor, status: "success" };
});
