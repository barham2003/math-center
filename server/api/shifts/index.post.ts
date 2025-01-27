import { ROLE } from "~/server/models/role.enum";
import { Shift } from "~/server/models/shift";
import convertTimeToNumber from "~/utils/convertTimeToNumber";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user || user.role !== ROLE.ADMIN) throw new Error("not authed");
  const body = await readBody(event);
  const { from, until, tutorId, day } = body;

  const convertedFrom = convertTimeToNumber(from);
  const convertedUntil = convertTimeToNumber(until);

  await Shift.create({
    tutorId,
    day,
    until: convertedUntil,
    from: convertedFrom,
  });
});
