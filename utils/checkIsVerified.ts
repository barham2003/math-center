import decryptJWT from "./decryptJWT.ts";
export default async function checkIsVerified(token: string) {
  const payload = await decryptJWT(token);
  if (payload.key === "IamVerified") {
    return true;
  } else {
    return false;
  }
}
