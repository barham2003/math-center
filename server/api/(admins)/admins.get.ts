import { ROLE } from "~/server/models/role.enum";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  const admins = await User.find({ role: ROLE.ADMIN });
  return admins;
});
