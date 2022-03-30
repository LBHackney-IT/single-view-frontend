import { config } from "@mfe/common/lib/config";
import {
  AxiosSWRConfiguration,
  AxiosSWRResponse,
  useAxiosSWR,
} from "@mfe/common/lib/http";

import { Asset } from "./types";

export const useAsset = (
  id: string | null,
  options?: AxiosSWRConfiguration<Asset>,
): AxiosSWRResponse<Asset> => {
  return useAxiosSWR(id && `${config.assetApiUrlV1}/assets/${id}`, options);
};
