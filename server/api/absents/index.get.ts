import { ROLE } from "~/server/models/role.enum";
import { Shift } from "~/server/models/shift";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  if (!user || user.role !== ROLE.ADMIN) throw new Error("not authed");
  const queries = getQuery(event);

  let from;
  let until;

  if (queries.from && queries.until) {
    from = new Date(queries.from as string);
    until = new Date(queries.until as string);
  } else {
    const today = new Date();
    const oneWeekAgo = new Date().setDate(today.getDate() - 7);
    from = new Date(oneWeekAgo);
    until = today;
  }

  const absents = await Shift.findAbsents(
    from,
    until,
    queries.tutorId as string,
  );

  return absents;
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
