import { Shift } from "~/server/models/shift";
import convertTimeToNumber from "~/utils/convertTimeToNumber";

export default defineEventHandler(async (event) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
});
