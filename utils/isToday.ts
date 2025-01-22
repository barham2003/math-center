export function isToday(checkISO: string) {
  let checkinDate = checkISO.split("T")[0];
  let todayDate = new Date().toISOString().split("T")[0];
  return checkinDate === todayDate;
}
