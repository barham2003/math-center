import { Tutor } from "~/server/models/tutor";

export default defineEventHandler(async (event) => {
  console.log("GOT HERE");
  const body = await readBody(event, { strict: false });
  console.log(body);

  try {
    const newTutor = await Tutor.create(body);
  } catch (e: any) {
    console.log("GOT ERROR");
    console.log(e);
    if (e.code === 11000) {
      return new Response("duplicate", { status: 409 });
    } else {
      return new Response("something went wrong with registring the data", {
        status: 400,
      });
    }
  }

  return {
    status: "success",
    message: "Successfully created a new tutor",
    // body,
  };
});
