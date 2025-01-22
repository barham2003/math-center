import { defineOAuthGoogleEventHandler } from "#imports";
import { User } from "~/server/models/user";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const isUserExist = await User.exists({ email: user.email });
    if (!isUserExist) return sendRedirect(event, "/");
    const foundUser = await User.findOneAndUpdate({ email: user.email }, {
      name: user.name,
      picture: user.picture,
    });
    await setUserSession(event, {
      user: { ...user, role: foundUser?.role, id: foundUser?._id },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error", error);
    return sendRedirect(event, "/");
  },
});
