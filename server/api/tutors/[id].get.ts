import { Tutor } from "~/server/models/tutor";

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;

  const tutor = await Tutor.findById(id);

  if (tutor) {
    return { tutor };
  } else {
    return { message: "Tutor not found", status: "fail" };
  }
});
