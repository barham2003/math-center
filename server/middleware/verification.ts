import checkIsVerified from "~/utils/checkIsVerified";

export default defineEventHandler((event) => {
  const path = event.path;
  if (
    path.includes("absents") ||
    path.includes("tutors") ||
    path.includes("attendandes") ||
    path.includes("shifts") ||
    path.includes("dashboard") ||
    path.includes("admin") ||
    path.includes("tutor")
  ) {
    const token = getCookie(event, "verify-token");
    if (!token) return sendRedirect(event, "/");
    const isVerified = checkIsVerified(token);

    if (!isVerified) {
      return sendRedirect(event, "/");
    }
  }
});
