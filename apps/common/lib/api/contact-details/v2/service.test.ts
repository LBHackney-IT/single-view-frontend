import {
  getContactDetailsV2,
  postContactDetailV2,
  server,
} from "@hackney/mtfh-test-utils";
import { renderHook } from "@testing-library/react-hooks";
import { RestRequest } from "msw";

import {
  ContactDetailsPhoneTypes,
  ContactInformationContactTypes,
} from "@mtfh/common/lib/api/contact-details/v2";
import { config } from "@mtfh/common/lib/config";

import {
  addContactDetail,
  addCorrespondenceAddress,
  addEmailContact,
  addPhoneContact,
  useContactDetails,
} from "./service";

test("useContactDetails: it should send the right thing to the API and return the response", async () => {
  const id = "uuid";
  const options = { errorRetryInterval: 2000 };
  const response = { id, etag: undefined };
  let method = "";
  const expectedMethod = "GET";
  let url = "";
  const expectedUrl = `${config.contactDetailsApiUrlV2}/contactDetails?targetId=${id}`;

  server.use(
    getContactDetailsV2((req: RestRequest) => {
      method = req.method;
      url = req.url.toString();
      return response;
    }),
  );

  const { result, waitForNextUpdate } = renderHook(() => useContactDetails(id, options));
  expect(result.current.data).toBe(undefined);
  await waitForNextUpdate();

  expect(result.current.data).toStrictEqual(response);
  expect(url).toContain(expectedUrl);
  expect(method).toBe(expectedMethod);
});

test("addContactDetail: it should send the right thing to the API and return the response", async () => {
  const id = "uuid";
  const data = {
    contactType: ContactInformationContactTypes.PHONE,
    subType: ContactDetailsPhoneTypes.HOME,
    value: "073253324",
    description: "home phone",
    addressExtended: null,
  };
  let method = "";
  const expectedMethod = "POST";
  let url = "";
  const expectedUrl = `${config.contactDetailsApiUrlV2}/contactDetails`;
  const response = { id, etag: undefined };

  server.use(
    postContactDetailV2((req: RestRequest) => {
      method = req.method;
      url = req.url.toString();
      return response;
    }),
  );

  const res = await addContactDetail(id, data);

  expect(res).toMatchObject({
    contactInformation: {
      addressExtended: null,
      contactType: "phone",
      description: "home phone",
      subType: "home",
      value: "073253324",
    },
    createdBy: {
      createdBy: expect.any(String),
      fullName: expect.any(String),
      id: expect.any(String),
    },
    id,
    isActive: true,
    sourceServiceArea: { area: "Housing", isDefault: true },
    targetId: id,
    targetType: "person",
  });
  expect(url).toContain(expectedUrl);
  expect(method).toBe(expectedMethod);
});

test("addEmailContact: it should send the right thing to the API and return the response", async () => {
  const id = "uuid";
  const email = "email";
  const description = "description";

  let method = "";
  const expectedMethod = "POST";
  let url = "";
  const expectedUrl = `${config.contactDetailsApiUrlV2}/contactDetails`;
  const response = { id, etag: undefined };

  server.use(
    postContactDetailV2((req: RestRequest) => {
      method = req.method;
      url = req.url.toString();
      return response;
    }),
  );

  const res = await addEmailContact(id, email, description);

  expect(res).toMatchObject({
    contactInformation: {
      contactType: "email",
      description,
      value: email,
    },
    createdBy: {
      createdBy: expect.any(String),
      fullName: expect.any(String),
      id: expect.any(String),
    },
    id,
    isActive: true,
    sourceServiceArea: { area: "Housing", isDefault: true },
    targetId: id,
    targetType: "person",
  });
  expect(url).toContain(expectedUrl);
  expect(method).toBe(expectedMethod);
});

test("addPhoneContact: it should send the right thing to the API and return the response", async () => {
  const id = "uuid";
  const phone = "phone";
  const type = ContactDetailsPhoneTypes.HOME;
  const description = "description";

  let method = "";
  const expectedMethod = "POST";
  let url = "";
  const expectedUrl = `${config.contactDetailsApiUrlV2}/contactDetails`;
  const response = { id, etag: undefined };

  server.use(
    postContactDetailV2((req: RestRequest) => {
      method = req.method;
      url = req.url.toString();
      return response;
    }),
  );

  const res = await addPhoneContact(id, phone, type, description);

  expect(res).toMatchObject({
    contactInformation: {
      contactType: "phone",
      subType: type,
      description,
      value: phone,
    },
    createdBy: {
      createdBy: expect.any(String),
      fullName: expect.any(String),
      id: expect.any(String),
    },
    id,
    isActive: true,
    sourceServiceArea: { area: "Housing", isDefault: true },
    targetId: id,
    targetType: "person",
  });
  expect(url).toContain(expectedUrl);
  expect(method).toBe(expectedMethod);
});

test("addCorrespondenceAddress: it should send the right thing to the API and return the response", async () => {
  const data = {
    id: "id",
    addressLine1: "addressLine1",
    postCode: "postCode",
  };

  let method = "";
  const expectedMethod = "POST";
  let url = "";
  const expectedUrl = `${config.contactDetailsApiUrlV2}/contactDetails`;
  const response = { id: data.id };

  server.use(
    postContactDetailV2((req: RestRequest) => {
      method = req.method;
      url = req.url.toString();
      return response;
    }),
  );

  const res = await addCorrespondenceAddress(data);

  expect(res).toMatchObject(response);
  expect(url).toContain(expectedUrl);
  expect(method).toBe(expectedMethod);
});
