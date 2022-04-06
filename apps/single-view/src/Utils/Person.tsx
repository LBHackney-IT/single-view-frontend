import { Person } from "../Interfaces/personInterfaces";

export const voidPerson: Person = {
  id: "",
  title: "",
  preferredTitle: "",
  preferredFirstName: "",
  preferredMiddleName: "",
  preferredSurname: "",
  firstName: "",
  middleName: "",
  surname: "",
  placeOfBirth: "",
  dateOfBirth: "",
  personTypes: [],
  tenures: [],
  reason: "",
  links: [],
  isAMinor: false,
  dateOfDeath: "",
};

export const fullName = (person: Person): string => {
  return `
        ${person.title}
        ${person.preferredFirstName || person.firstName}
        ${person.middleName || ""}
        ${person.preferredSurname || person.surname}
    `;
};

export const formatDateOfBirth = (dob: string): string => {
  let [year, month, day] = dob.split("-");
  return [day, month, year].join("/");
};
