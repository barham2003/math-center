import type { ROLE } from "~/server/models/role.enum.ts";

declare module "#auth-utils" {
  interface User {
    name: string;
    email: string;
    role: ROLE;
    picture: string;
    id: string;
  }
}
export { };
