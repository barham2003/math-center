import { Attendance } from "~/server/models/attendance";

export default defineEventHandler(async (event) => {
  console.log("\n\n\n\n GOT HERE \n\n\n\n");
  const attendanceId = event?.context?.params?.id;
  const checkoutTime = new Date();
  await Attendance.findOneAndUpdate({ _id: attendanceId }, { checkoutTime });
  return new Response("ok");
});
