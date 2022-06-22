import { customerProfile, SystemId } from ".";

export interface customerResponse {
  systemIds: Array<SystemId>;
  customer: customerProfile;
}
