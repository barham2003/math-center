export default function getToday() {
  const today = new Date()
    .toLocaleString("en-US", { weekday: "short" })
    .toLowerCase();

  return today;
}
