import { config } from "@mtfh/common/lib/config";
import {
  AxiosSWRConfiguration,
  AxiosSWRResponse,
  useAxiosSWR,
} from "@mtfh/common/lib/http";

import type { ReferenceData } from "./types";

type ReferenceDataResponse<T extends string> = { [key in T]: ReferenceData[] };

interface ReferenceDataRequestParams {
  category: string;
  subCategory?: string;
}

export const useReferenceData = <T extends string>(
  { category, subCategory }: ReferenceDataRequestParams,
  options?: AxiosSWRConfiguration<ReferenceDataResponse<T>>,
): AxiosSWRResponse<ReferenceDataResponse<T>> => {
  let params = `category=${category}`;
  /* istanbul ignore else */
  if (subCategory) {
    params += `&subCategory=${subCategory}`;
  }
  return useAxiosSWR<ReferenceDataResponse<T>>(
    `${config.referenceDataApiUrlV1}/reference-data?${params}`,
    options,
  );
};
