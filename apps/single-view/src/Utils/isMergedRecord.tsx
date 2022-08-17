import { housingSearchPerson } from "../Interfaces";

export function isMergedRecord(person: housingSearchPerson): boolean {
    if (person.dataSources == null) {
        console.log(person.firstName, person.surName)
    }
    return (person.dataSources.length > 1)
};