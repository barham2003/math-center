import * as jose from "jose";
import crypto from "crypto";
import "dotenv/config";

const cookieOptions = {
  // secure: true,
  // httpOnly: true,
  sameSite: "strict",
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
} as const;

const secretKey = crypto.createSecretKey(
  process.env.NUXT_SESSION_PASSWORD || "",
  "utf-8",
);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const token = await createToken({ key: "IamVerified" });

    if (body.password !== "%%%MathCenter") {
      throw new Error("Wrong password");
    }
    setCookie(event, "verify-token", token, cookieOptions);
    return {
      status: "success",
      message: "Successfully verified",
    };
  } catch {
    return new Response(
      JSON.stringify({ status: "fail", message: "Wrong password" }),
      { status: 400 },
    );
  }
});

async function createToken(obj: any) {
  const token = await new jose
    .SignJWT(obj)
    .setIssuedAt()
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("4weeks")
    .sign(secretKey);

  return token;
}
