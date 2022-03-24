import { config } from "@mtfh/common/lib/config";
import { axiosInstance, mutate } from "@mtfh/common/lib/http";

import type { Person } from "./types";

export interface PostPersonRequestData extends Omit<Person, "id" | "tenures"> {
  reason: string;
}

export const addPerson = async (data: PostPersonRequestData): Promise<Person> => {
  const { data: person } = await axiosInstance.post(
    `${config.personApiUrlV2}/persons`,
    data,
  );
  mutate(`${config.personApiUrlV1}/persons/${person.id}`, person, false);
  return person;
};
