import { ROLE } from "~/server/models/role.enum";
import { User } from "~/server/models/user";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event, { strict: false });
    await User.create({ ...body, role: ROLE.TUTOR });
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
