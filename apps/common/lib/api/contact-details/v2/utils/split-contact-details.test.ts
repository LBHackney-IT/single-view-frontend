import {
  mockContactDetailCorrespondenceAddressV2,
  mockContactDetailEmailV2,
  mockContactDetailPhoneV2,
} from "@hackney/mtfh-test-utils";

import { splitContactDetailsByType } from "./split-contact-details";

test("it should split contact details by type", () => {
  expect(
    splitContactDetailsByType([
      mockContactDetailEmailV2,
      mockContactDetailPhoneV2,
      mockContactDetailCorrespondenceAddressV2,
    ]),
  ).toEqual({
    emails: [mockContactDetailEmailV2],
    phones: [mockContactDetailPhoneV2],
    addresses: [mockContactDetailCorrespondenceAddressV2],
  });
});
