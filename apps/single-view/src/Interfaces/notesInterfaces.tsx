export interface Note {
  id: string;
  description: string;
  targetType: string;
  targetId: string;
  createdAt: string;
  categorisation: Categorisation;
  author: Author;
}

interface Categorisation {
  category: string;
  subCategory: string;
  description: string;
}

interface Author {
  fullName: string;
  email: string;
}
