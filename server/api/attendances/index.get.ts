import { Attendance } from "~/server/models/attendance";
import { ROLE } from "~/server/models/role.enum";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user || user.role !== ROLE.ADMIN) throw new Error("not authed");
  const query = getQuery(event);
  let attendancesQuery: any = Attendance;

  if (query.createdAt) {
    attendancesQuery = attendancesQuery.find({ createdAt: query.createdAt });
  } else {
    attendancesQuery = attendancesQuery.find();
  }

  const attendances = await attendancesQuery
    .sort({ createdAt: -1 })
    .populate({ path: "shift", populate: "tutor" });

  return attendances;
});
