import { defineOAuthGoogleEventHandler } from "#imports";
import { User } from "~/server/models/user";
import "dotenv/config";
import process from "process";
import { ROLE } from "~/server/models/role.enum";

const isTutorAllowed = process.env.IS_TUTOR_ALLOWED === "true";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const foundUser = await User.findOneAndUpdate(
      { email: user.email },
      { name: user.name, picture: user.picture },
    );

    if (!foundUser) return sendRedirect(event, "/");

    if (foundUser.role === ROLE.TUTOR && !isTutorAllowed)
      return sendRedirect(event, "/");

    await setUserSession(event, {
      user: {
        name: user.name,
        picture: user.picture,
        email: user.email,
        role: foundUser.role,
        id: foundUser?._id.toString(),
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error", error);
    return sendRedirect(event, "/");
  },
});
