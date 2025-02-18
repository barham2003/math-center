import checkIsVerified from "~/utils/checkIsVerified";

export default defineEventHandler((event) => {
  const path = event.path;
  if (
    path.includes("/api/auth") ||
    path.includes("login") ||
    path.includes("verify") ||
    path === "/"
  ) return;

  const token = getCookie(event, "verify-token");
  if (!token) return sendRedirect(event, "/");
  const isVerified = checkIsVerified(token);

  if (!isVerified) {
    return sendRedirect(event, "/");
  }
});
