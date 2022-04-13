// TODO: Replace with @mfe common interfaces
// TODO: Refactor enums living in interfaces

export interface Note {
  id: string;
  title: string | null;
  description: string;
  targetType: string;
  targetId: string;
  createdAt: string;
  categorisation: Categorisation;
  author: Author;
  highlight: boolean;
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
