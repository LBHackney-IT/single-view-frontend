export const formatDateOfBirth = (dob: string): string => {
  let [year, month, day] = dob.split("-");
  return [day, month, year].join("/");
};
