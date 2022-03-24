import { config } from "@mtfh/common/lib/config";
import {
  AxiosSWRConfiguration,
  AxiosSWRResponse,
  axiosInstance,
  useAxiosSWR,
} from "@mtfh/common/lib/http";

import type { EqualityData } from "./types";

export const useEqualityInformation = (
  targetId: string,
  options?: AxiosSWRConfiguration<EqualityData>,
) =>
  useAxiosSWR<EqualityData>(
    `${config.equalityInformationApiUrlV1}/equality-information?targetId=${targetId}`,
    {
      ...options,
    },
  );

export const useEqualityInformationById = (
  id: string,
  targetId: string,
  options?: AxiosSWRConfiguration<EqualityData>,
): AxiosSWRResponse<EqualityData> =>
  useAxiosSWR(
    `${config.equalityInformationApiUrlV1}/equality-information/${id}?targetId=${targetId}`,
    options,
  );

export const addEqualityInformation = async (data: Omit<EqualityData, "id">) =>
  axiosInstance.post(`${config.equalityInformationApiUrlV1}/equality-information`, data);

export const updateEqualityInformation = async (
  id: string,
  data: Omit<EqualityData, "id">,
) =>
  axiosInstance.patch(
    `${config.equalityInformationApiUrlV1}/equality-information/${id}`,
    data,
  );
