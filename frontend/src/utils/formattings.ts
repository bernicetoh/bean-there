export function convertDate(date: Date) {
  const d = new Date(date);
  const dformat =
    [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/") +
    " " +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
  return dformat;
}
