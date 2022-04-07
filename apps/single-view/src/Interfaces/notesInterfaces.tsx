export interface Note {
  id: string;
  title: string;
  description: string;
  targetType: keyof typeof NoteTargetType;
  targetId: string;
  createdAt: string;
  categorisation: Categorisation;
  author: Author;
  highlight: boolean;
}

interface Categorisation {
  category: keyof typeof NoteCategory;
  subCategory: string;
  description: string;
}

interface Author {
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
};
