import {
  generateMockCommentV2,
  generateMockReferenceDataV1,
  getCommentV2,
  getReferenceDataV1,
  getWorkOrdersV2,
  mockCommentReferenceDataV1,
  server,
} from "@hackney/mtfh-test-utils";

export const mockCategoryReferenceDataV1 = Array.from({ length: 3 }).map((_, index) =>
  generateMockReferenceDataV1({
    category: "comment",
    subCategory: "category",
    code: `categoryCode${index + 1}`,
    value: `Category value ${index + 1}`,
  }),
);

export const mockCommentsV2 = Array.from({ length: 20 }).map((_, index) =>
  generateMockCommentV2({
    title: `Comment title ${index + 1}`,
    author: {
      id: String(index + 1),
      fullName: `Full name ${index + 1}`,
      email: `email${index}@test.com`,
    },
    categorisation: {
      category: `categoryCode${index + 1}`,
      subCategory: "Laborum ratione a officia quaerat cumque incidunt.",
      description: "aut",
    },
  }),
);

beforeEach(() => {
  server.use(
    getCommentV2(mockCommentsV2),
    getReferenceDataV1([...mockCategoryReferenceDataV1, ...mockCommentReferenceDataV1]),
    getWorkOrdersV2(),
  );
});
