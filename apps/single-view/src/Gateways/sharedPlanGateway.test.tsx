import { createSharedPlan } from "./sharedPlanGateway";
import axios from "axios";
import { customerProfile, SystemId } from "../Interfaces";
const mockAxios = axios as jest.Mocked<typeof axios>;
jest.mock("axios", () => {
  return {
    post: jest.fn(),
    delete: jest.fn(),
  };
});

const personFixture: customerProfile = {
  firstName: "testFirstName",
  surname: "testLastName",
  allContactDetails: [
    {
      dataSourceName: "PersonAPI",
      isActive: true,
      sourceServiceArea: "Housing",
      contactType: "phone",
      subType: "mobile",
      value: "(07700) 900 557",
      description: "Personal phone",
      addressExtended: null,
    },
    {
      dataSourceName: "PersonAPI",
      isActive: true,
      sourceServiceArea: "Housing",
      contactType: "email",
      subType: "",
      value: "test@test.com",
      description: "Personal phone",
      addressExtended: null,
    },
  ],
  id: "",
  dataSource: "",
  dateOfBirth: "",
  placeOfBirth: "",
  preferredTitle: null,
  title: null,
  preferredFirstName: null,
  preferredSurname: null,
  pregnancyDueDate: null,
  accommodationType: null,
  housingCircumstance: null,
  isSettled: null,
  supportWorker: null,
  gender: null,
  dateofDeath: null,
  personTypes: null,
  niNo: null,
  nhsNumber: null,
  cautionaryAlerts: null,
  knownAddresses: null,
  isAMinor: false,
  councilTaxAccount: null,
  housingBenefitsAccount: null,
  equalityInformation: null,
  sharedPlan: {
    planIds: [],
  },
};

const systemIdsFixture: SystemId[] = [
  {
    id: "systemIdOne",
    systemName: "shared-plan",
  },
  {
    id: "systemIdTwo",
    systemName: "shared-plan2",
  },
];

const sharedPlanMockResponseData = {
  id: "test-id",
  firstName: "Luna",
  lastName: "Cat",
  url: "https://sharedplan.com/test-id",
};

describe("shared plan gateway", () => {
  it("should return correct data", async () => {
    const mockResponse = { status: 201, data: sharedPlanMockResponseData };
    mockAxios.post.mockImplementationOnce(async () => mockResponse);
    expect(await createSharedPlan(personFixture, systemIdsFixture)).toEqual(
      sharedPlanMockResponseData
    );
  });

  it("should ", async () => {
    const mockResponse = { status: 201, data: sharedPlanMockResponseData };
    mockAxios.post.mockImplementationOnce(async () => mockResponse);
    expect(await createSharedPlan(personFixture, systemIdsFixture)).toEqual(
      sharedPlanMockResponseData
    );
  });
});
