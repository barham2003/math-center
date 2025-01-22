export default function convertNumberToTime(theNumber: number) {
  let hoursWithDigits = (theNumber / 60) / 60;
  let timeShift = "";

  if (hoursWithDigits > 12) {
    hoursWithDigits = hoursWithDigits - 12;

    timeShift = "PM";
  } else {
    timeShift = "AM";
  }

  const hours = Math.floor(hoursWithDigits);

  const formattedHours = hours.toString().padStart(2, "0");

  const minutes = Math.round((hoursWithDigits - hours) * 60).toString()
    .padStart(2, "0");
  return `${formattedHours}:${minutes} ${timeShift}`;
}
