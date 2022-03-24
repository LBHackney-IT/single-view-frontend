import React from "react";

import {
  generateMockReferenceDataV1,
  mockCommentV2,
  render,
} from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { CommentListItem } from "./comment-list-item";

test("Comment renders", () => {
  render(<CommentListItem categories={[]} comment={mockCommentV2} />);
  expect(screen.getByText(mockCommentV2.title as string)).toBeInTheDocument();
  expect(screen.getByText(mockCommentV2.author.fullName)).toBeInTheDocument();
});

test("Comment renders date in the correct format", () => {
  render(<CommentListItem categories={[]} comment={mockCommentV2} />);
  expect(screen.getByText(/\d{2}\/\d{2}\/\d{4}/)).toBeInTheDocument();
});

test("Comment does not display title if it is missing", () => {
  const mockCommentWithoutTitle = mockCommentV2;
  mockCommentWithoutTitle.title = null;
  mockCommentWithoutTitle.categorisation = {
    category: null,
    subCategory: null,
    description: null,
  };
  render(<CommentListItem categories={[]} comment={mockCommentWithoutTitle} />);
  expect(screen.queryByText(mockCommentWithoutTitle.author.fullName)).toBeInTheDocument();
});

test("Comment displays category value if categorisation exists", () => {
  const mockCategoryCommentV2 = {
    ...mockCommentV2,
    categorisation: {
      category: "categoryCode2",
      subCategory: "Laborum ratione a officia quaerat cumque incidunt.",
      description: "aut",
    },
  };

  const mockCategories = [
    generateMockReferenceDataV1({
      code: "categoryCode2",
      value: "Category value 2",
    }),
  ];

  render(<CommentListItem categories={mockCategories} comment={mockCategoryCommentV2} />);

  expect(screen.queryByText("Category value 2")).toBeInTheDocument();
});
