export const formatDateOfBirth = (dob: string): string => {
  let [year, month, day] = dob.split("-");
  return [day, month, year].join("/");
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
