import { Tutor } from "~/server/models/tutor";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { _id } = JSON.parse(body);
    await Tutor.findByIdAndDelete(_id);
  } catch (e) {
    console.log(e);
    return new Response('{wrong: "wrong"}', { status: 400 });
  }
  return {
    message: "DONE",
    status: "success",
  };
});
