export interface WorkOrder {
  id: string;
  dateRaised: string;
  description: string;
  lastUpdated: string | null;
  owner: string;
  priority: string;
  property: string;
  propertyPostCode: string | null;
  propertyReference: string;
  reference: number;
  status: string;
  tradeCode: string;
  tradeDescription: string;
}

export type WorkOrdersResponse = WorkOrder[];

export enum WorkOrdersFilters {
  CANCELLED = "Cancelled",
  COMPLETED = "Completed",
  IN_PROGRESS = "InProgress",
  LOCKED = "Locked",
  ON_HOLD = "OnHold",
}

export const REPAIR_FILTER_LIST = [
  { code: WorkOrdersFilters.CANCELLED, value: "cancelled" },
  { code: WorkOrdersFilters.COMPLETED, value: "completed" },
  { code: WorkOrdersFilters.IN_PROGRESS, value: "in progress" },
  { code: WorkOrdersFilters.LOCKED, value: "locked" },
  { code: WorkOrdersFilters.ON_HOLD, value: "on hold" },
];
