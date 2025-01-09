import { Admin } from "../../models/admin";

export default defineEventHandler(async (event) => {
  const admins = await Admin.find();
  return admins;
});
