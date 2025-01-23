export default function getNearestDate(
  day: "sun" | "mon" | "tue" | "wed" | "thu",
) {
  const dayNames = ["sun", "mon", "tue", "wed", "thu"];

  const targetDayIndex = dayNames.indexOf(day);
  const today = new Date();
  const todayIndex = today.getDay();

  // Calculate difference and wrap around to get the nearest previous day
  const diff = (todayIndex - targetDayIndex + 7) % 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() - diff);

  return targetDate;
}
