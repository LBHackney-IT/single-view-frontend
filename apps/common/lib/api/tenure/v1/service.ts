import { config } from "@mtfh/common/lib/config";
import {
  AxiosSWRConfiguration,
  AxiosSWRResponse,
  axiosInstance,
  mutate,
  useAxiosSWR,
} from "@mtfh/common/lib/http";

import { HouseholdMember, Tenure, TenureAsset, TenureType } from "./types";

export const useTenure = (
  id: string | null,
  options?: AxiosSWRConfiguration<Tenure>,
): AxiosSWRResponse<Tenure> => {
  return useAxiosSWR(id && `${config.tenureApiUrlV1}/tenures/${id}`, options);
};

export interface TenureParams {
  startOfTenureDate: string;
  endOfTenureDate?: string | null;
  tenureType: TenureType;
}

export interface AddTenureParams extends TenureParams {
  tenuredAsset: TenureAsset;
}

export const addTenure = async (params: AddTenureParams): Promise<Tenure> => {
  const { data: tenure } = await axiosInstance.post<Tenure>(
    `${config.tenureApiUrlV1}/tenures`,
    params,
  );
  mutate(`${config.tenureApiUrlV1}/tenures/${tenure.id}`, tenure, false);

  return tenure;
};

export interface AddPersonToTenureParams {
  etag: string;
  tenureId: string;
  householdMember: HouseholdMember;
}

export const addPersonToTenure = async ({
  tenureId,
  householdMember,
  etag,
}: AddPersonToTenureParams): Promise<void> => {
  await axiosInstance.patch(
    `${config.tenureApiUrlV1}/tenures/${tenureId}/person/${householdMember.id}`,
    { ...householdMember, etag },
  );
};

export interface RemovePersonFromTenureParams {
  etag: string;
  tenureId: string;
  householdMemberId: string;
}

export const removePersonFromTenure = async (
  params: RemovePersonFromTenureParams,
): Promise<void> => {
  await axiosInstance.delete(
    `${config.tenureApiUrlV1}/tenures/${params.tenureId}/person/${params.householdMemberId}`,
  );
};
export interface EditTenureParams extends Partial<TenureParams> {
  id: string;
  etag: string;
}

export const editTenure = async ({ id, ...data }: EditTenureParams): Promise<void> => {
  const response = await axiosInstance.patch(
    `${config.tenureApiUrlV1}/tenures/${id}`,
    data,
  );
  return response.data;
};
