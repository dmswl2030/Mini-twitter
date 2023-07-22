export function formatDateAndTime(inputDate: string | undefined) {
  if (!inputDate) {
    return "";
  }
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12;

  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${ampm} · ${month} ${day}, ${year}`;
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
