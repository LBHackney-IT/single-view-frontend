import { $auth } from "@mtfh/common/lib/auth";
import { config } from "@mtfh/common/lib/config";
import { AxiosSWRResponse, useAxiosSWR } from "@mtfh/common/lib/http";

import { WorkOrdersFilters, WorkOrdersResponse } from "./types";

export interface RepairsRequestParams {
  propertyReference: string;
  PageNumber?: number;
  PageSize?: number;
  StatusCode?: string;
}

const repairStatusGroupings: { [key: string]: string[] } = {
  [WorkOrdersFilters.CANCELLED]: ["30"],
  [WorkOrdersFilters.COMPLETED]: ["40", "50"],
  [WorkOrdersFilters.IN_PROGRESS]: [
    "20",
    "60",
    "80",
    "90",
    "100",
    "110",
    "120",
    "1000",
    "1010",
    "1080",
    "1090",
  ],
  [WorkOrdersFilters.LOCKED]: ["200"],
  [WorkOrdersFilters.ON_HOLD]: ["10", "70"],
};

export const useWorkOrders = (
  id: string,
  filter?: WorkOrdersFilters,
  pageNumber = "1",
  pageSize = "12",
): AxiosSWRResponse<WorkOrdersResponse> => {
  const params = new URLSearchParams();

  params.append("propertyReference", id);
  params.append("PageNumber", pageNumber);
  params.append("PageSize", pageSize);

  if (filter && repairStatusGroupings[filter]) {
    repairStatusGroupings[filter].forEach((status) => {
      params.append("StatusCode", status);
    });
  }

  return useAxiosSWR<WorkOrdersResponse>(
    `${config.repairsHubApiUrl}/workOrders?${params}`,
    {
      headers: {
        "x-hackney-user": $auth.getValue().token,
      },
    },
  );
};
