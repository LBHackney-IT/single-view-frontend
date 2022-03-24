import { config } from "@mtfh/common/lib/config";
import {
  AxiosSWRConfiguration,
  AxiosSWRResponse,
  axiosInstance,
  mutate,
  useAxiosSWR,
} from "@mtfh/common/lib/http";

import type { Person, TenureSummary } from "./types";

export const usePerson = (
  id: string | null,
  options?: AxiosSWRConfiguration<Person>,
): AxiosSWRResponse<Person> => {
  return useAxiosSWR<Person>(id && `${config.personApiUrlV1}/persons/${id}`, options);
};

export interface PostPersonRequestData extends Omit<Person, "id" | "tenures"> {
  reason: string;
  tenures: Omit<TenureSummary, "isActive">[];
}

export const addPerson = async (data: PostPersonRequestData): Promise<Person> => {
  const { data: person } = await axiosInstance.post(
    `${config.personApiUrlV1}/persons`,
    data,
  );
  mutate(`${config.personApiUrlV1}/persons/${person.id}`, person, false);
  return person;
};

export type PatchPersonRequestData = Partial<Omit<Person, "id">> & Pick<Person, "id">;

export const editPerson = async ({
  id,
  ...data
}: PatchPersonRequestData): Promise<Person> => {
  const response = await axiosInstance.patch(
    `${config.personApiUrlV1}/persons/${id}`,
    data,
  );
  return response.data;
};
