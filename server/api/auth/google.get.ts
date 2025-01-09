import { defineOAuthGoogleEventHandler } from "#imports";
import { Tutor } from "~/server/models/tutor";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    await Tutor.findOneAndUpdate({ email: user.email }, {
      picture: user.picture,
    });
    await setUserSession(event, { user });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.log(error);
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
