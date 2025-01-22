import { Shift } from "~/server/models/shift";

export default defineEventHandler(async (event) => {
  try {
    const { shiftId } = await readBody(event);
    await Shift.findByIdAndDelete(shiftId);
  } catch (e) {
  }
});
