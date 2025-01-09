import { Tutor } from "../../models/tutor";

export default defineEventHandler(async (event) => {
  const tutors = await Tutor.find({});

  return tutors;
});
