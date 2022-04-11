export interface Note {
  id: string;
  title: string;
  description: string;
  targetType: string;
  targetId: string;
  createdAt: string;
  categorisation: Categorisation;
  author: Author;
  highlight: boolean;
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
