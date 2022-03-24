import { ContactDetail, ContactInformationContactTypes } from "../types";

interface SplitContactDetailsByType {
  emails: ContactDetail[];
  phones: ContactDetail[];
  addresses: ContactDetail[];
}

export const splitContactDetailsByType = (
  contacts: ContactDetail[],
): SplitContactDetailsByType => {
  const emails: ContactDetail[] = [];
  const phones: ContactDetail[] = [];
  const addresses: ContactDetail[] = [];

  for (const contact of contacts) {
    const {
      contactInformation: { contactType },
    } = contact;

    if (contactType === ContactInformationContactTypes.EMAIL) {
      emails.push(contact);
    }

    if (contactType === ContactInformationContactTypes.PHONE) {
      phones.push(contact);
    }

    if (contactType === ContactInformationContactTypes.ADDRESS) {
      addresses.push(contact);
    }
  }

  return { emails, phones, addresses };
};
