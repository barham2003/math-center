import { defineOAuthGoogleEventHandler } from "#imports";
import { User } from "~/server/models/user";
import "dotenv/config";
import process from "process";
import { ROLE } from "~/server/models/role.enum";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const isTutorAllowed = process.env.IS_TUTOR_ALLOWED === "true";

    const foundUser = await User.findOneAndUpdate({ email: user.email }, {
      name: user.name,
      picture: user.picture,
    });

    if (!foundUser) return sendRedirect(event, "/");
    if (foundUser.role === ROLE.TUTOR && !isTutorAllowed) {
      return sendRedirect(event, "/");
    }
    await setUserSession(event, {
      user: {
        name: user.name,
        picture: user.picture as string,
        email: user.email,
        role: foundUser.role,
        id: foundUser?._id,
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error", error);
    return sendRedirect(event, "/");
  },
});
