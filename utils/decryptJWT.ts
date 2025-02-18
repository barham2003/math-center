import crypto from "crypto";
import * as jose from "jose";
const secretKey = crypto.createSecretKey(
  process.env.NUXT_SESSION_PASSWORD || "",
  "utf-8",
);

export default async function decryptJWT(token: string) {
  const jwtBody = await jose.jwtVerify(token, secretKey);
  return jwtBody.payload;
}
