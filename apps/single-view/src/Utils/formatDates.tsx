export const formatDateOfBirth = (dob: string): string => {
  if (!dob) return "undefined";
  let [date, time] = dob.split("T");
  let [year, month, day] = date.split("-");
  return [day, month, year].join("/");
};

export const formatCautionaryAlertsDate = (date: string | null): string => {
  if (!date) return "undefined";
  let d = new Date(date);

  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);

  return `${day} ${month} ${year}`;
};

export const formatDate = (dateString: string): string => {
  let d = new Date(dateString);

  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const hh = d.getHours();
  const mm = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();

  return `${da}/${mo}/${ye} ${hh}:${mm}`;
};
