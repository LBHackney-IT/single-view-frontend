import { config } from "@mtfh/common/lib/config";
import {
  AxiosSWRConfiguration,
  AxiosSWRResponse,
  axiosInstance,
  useAxiosSWR,
} from "@mtfh/common/lib/http";

import type { CreateProcess, Process, UpdateProcess } from "./types";

export type PostProcessRequestData = Omit<
  CreateProcess,
  "relatedEntities" | "formData" | "documents"
>;

export const addProcess = async (
  data: PostProcessRequestData,
  processName: string,
): Promise<Process> => {
  const { data: process } = await axiosInstance.post(
    `${config.processApiUrlV1}/process/${processName}`,
    data,
  );
  return process;
};

export type GetProcessRequestData = Pick<Process, "id" | "processName">;

export const useProcess = (
  { id, processName }: GetProcessRequestData,
  options?: AxiosSWRConfiguration<Process>,
): AxiosSWRResponse<Process> => {
  return useAxiosSWR<Process>(
    `${config.processApiUrlV1}/process/${processName}/${id}`,
    options,
  );
};

export type PatchProcessRequestData = Partial<UpdateProcess> &
  Pick<Process, "id" | "processName" | "etag"> & { processTrigger: string };

export const editProcess = async ({
  id,
  processName,
  processTrigger,
  ...data
}: PatchProcessRequestData): Promise<Process> => {
  const response = await axiosInstance.patch(
    `${config.processApiUrlV1}/process/${processName}/${id}/${processTrigger}`,
    data,
  );
  return response.data;
};
