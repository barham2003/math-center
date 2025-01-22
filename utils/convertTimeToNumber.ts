export default function convertTimeToNumber(time: string) {
  const [hours, mins] = time.split(":");
  const hoursInSeconds = Number(hours) * 60 * 60;
  const minsInSeconds = Number(mins) * 60;
  const total = hoursInSeconds + minsInSeconds;
  return total;
}
