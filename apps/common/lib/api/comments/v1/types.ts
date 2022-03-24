export interface CommentCategorisation {
  category: string | null;
  subCategory: string | null;
  description: string | null;
}

export interface CommentAuthor {
  id: string;
  fullName: string;
  email?: string;
}

export interface Comment {
  id: string;
  description: string;
  categorisation: CommentCategorisation;
  author: CommentAuthor;
  createdAt: string;
  targetType?: string;
  targetId?: string;
}
