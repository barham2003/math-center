import { defineOAuthGoogleEventHandler } from "#imports";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    console.log(user);
    await setUserSession(event, { user });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.log(error);
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
