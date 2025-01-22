import type { ROLE } from "~/server/models/role.enum.ts";

declare module "#auth-utils" {
  interface User {
    email: string;
    role: ROLE;
    picutre: string;
    id: string;
  }
}
export {};
