import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isToday(checkISO: string) {
  let checkinDate = checkISO.split("T")[0];
  let todayDate = new Date().toISOString().split("T")[0];
  return checkinDate === todayDate;
}
