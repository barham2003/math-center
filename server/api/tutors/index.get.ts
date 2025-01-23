import { ROLE } from "~/server/models/role.enum";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user || user.role !== ROLE.ADMIN) throw new Error("not authed");
  const tutors = await User.find({ role: ROLE.TUTOR }).sort({
    createdAt: -1,
  });
  return tutors;
});
