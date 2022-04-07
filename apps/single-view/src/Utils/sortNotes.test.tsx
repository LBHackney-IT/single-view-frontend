import { sortNotes } from "./sortNotes";
import { Note } from "../Interfaces"

describe("sortNotes function", () => {
  it("sorts the notes in ascending date order", () => {
    let sortedData = sortNotes(mockData);
    expect(sortedData).toEqual(mockDataSortedAscending);
  });
});

const mockData: Note[] = [
  {
    id: "14e00ab1-9fd6-4f10-a6bd-bd84171bfb1b",
    title: "Note Title",
    description: "some notes to attach to an object",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-19T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Mary Smith",
      email: "Mary.Smith@test.com",
    },
    highlight: true,
  },
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-20T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-24T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "tenure",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2020-02-24T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
];

const mockDataSortedAscending = [
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "tenure",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2020-02-24T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
  {
    id: "14e00ab1-9fd6-4f10-a6bd-bd84171bfb1b",
    title: "Note Title",
    description: "some notes to attach to an object",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-19T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Mary Smith",
      email: "Mary.Smith@test.com",
    },
    highlight: true,
  },
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-20T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-24T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
];

const mockDataSortedDescending = [
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-24T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-20T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
  {
    id: "14e00ab1-9fd6-4f10-a6bd-bd84171bfb1b",
    title: "Note Title",
    description: "some notes to attach to an object",
    targetType: "person",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2021-02-19T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Mary Smith",
      email: "Mary.Smith@test.com",
    },
    highlight: true,
  },
  {
    id: "1069d599-7c36-4aaf-9b23-58e67cef2d53",
    title: "Note Title",
    description:
      "Maecenas tincidunt sed purus vulputate rhoncus. Aenean pharetra metus vel enim ultrices viverra. Donec nec efficitur tortor. Quisque suscipit in nisi in tempor. Cras auctor arcu eu tristique aliquam. Duis cursus maximus tortor sit amet faucibus. Morbi urna massa, ultrices ut massa ultricies, fermentum tempor risus.",
    targetType: "tenure",
    targetId: "01a54157-b16f-4b53-d470-207447ee8d59",
    createdAt: "2020-02-24T15:12:00Z",
    categorisation: {
      category: "appointments",
      subCategory: "subcategory",
      description: "some description",
    },
    author: {
      fullName: "Charli Wild",
      email: "charli.wild@hackney.gov.uk",
    },
    highlight: true,
  },
];
