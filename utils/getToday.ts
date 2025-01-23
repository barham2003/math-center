export default function getToday() {
  let today = new Date()
    .toLocaleString("en-US", { weekday: "short" })
    .toLowerCase();

  return today as "sun" | "mon" | "tue" | "wed" | "thu";
}
