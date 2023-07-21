export function formatDateAndTime(dateString: string | undefined): string {
  if (!dateString) {
    return "";
  }

  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const date = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}`;
  return formattedDateTime;
}

export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
