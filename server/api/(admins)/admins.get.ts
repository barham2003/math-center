import { ROLE } from "~/server/models/role.enum";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user || user.role !== ROLE.ADMIN) throw new Error("not authed");
  const admins = await User.find({ role: ROLE.ADMIN });
  return admins;
});
