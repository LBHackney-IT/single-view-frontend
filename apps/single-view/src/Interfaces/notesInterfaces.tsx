// TODO: Replace with @mfe common interfaces
// TODO: Refactor enums living in interfaces

export interface Note {
  id: string;
  jigsawCaseReferenceId?: string | null;
  title: string | null;
  description: string;
  targetType: string;
  targetId: string;
  createdAt: string;
  categorisation: Categorisation;
  author: Author;
  highlight: boolean;
  isSensitive: boolean;
  isPinned: boolean;
  dataSource: string;
  dataSourceId: string;
}

export interface Categorisation {
  category: string | null;
  subCategory: string | null;
  description: string | null;
}

export interface Author {
  fullName: string;
  email: string;
}

export interface DataSource {
  id: string;
  name: string;
}

export enum NoteTargetType {
  person = "person",
  asset = "asset",
  tenure = "tenure",
  repair = "repair",
}

export enum NoteCategory {
  appointments = "appointments",
  asb = "asb",
  estateManagement = "estateManagement",
  evictions = "evictions",
  serviceCharge = "serviceCharge",
  parking = "parking",
  rents = "rents",
  tenureBreaches = "tenureBreaches",
  repairs = "repairs",
  plannedMaintenance = "plannedMaintenance",
  tenureManagement = "tenureManagement",
  rehousing = "rehousing",
  temporaryDecant = "temporaryDecant",
  voids = "voids",
}
