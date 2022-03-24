export type AssetType = "Dwelling" | "LettableNonDwelling" | string;

export interface Asset {
  id: string;
  assetId: string;
  assetType: AssetType;
  assetLocation: AssetLocation;
  assetAddress: AssetAddress;
  assetManagement: AssetManagement;
  assetCharacteristics: AssetCharacteristics;
  tenure: AssetTenure | null;
  rootAsset: string;
  parentAssetIds: string;
}

interface AssetLocation {
  floorNo: number;
  totalBlockFloors: number;
  parentAssets: Assets[];
}

interface Assets {
  type: string;
  id: string;
  name: string;
}

export interface AssetAddress {
  uprn: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  postCode: string;
  postPreamble: string;
}

interface AssetManagement {
  agent: string;
  areaOfficeName: string;
  isCouncilProperty: boolean;
  managingOrganisation: string;
  managingOrganisationId: string;
  owner: string;
  isTMOManaged: boolean;
}

interface AssetCharacteristics {
  numberOfBedrooms: number;
  numberOfLifts: number;
  numberOfLivingRooms: number;
  windowType: "DBL";
  yearConstructed: string;
}

export interface AssetTenure {
  id: string;
  paymentReference: string;
  type: string;
  startOfTenureDate: string;
  endOfTenureDate: string;
  isActive: boolean;
}
