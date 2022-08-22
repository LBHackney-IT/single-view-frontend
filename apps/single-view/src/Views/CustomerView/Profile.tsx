import React, { useState, useEffect } from "react";
import { DescriptionListItem } from "../../Components";
import { customerProfile, SystemId } from "../../Interfaces";
import {
  formatCautionaryAlertsDate,
  formatDateOfBirth,
} from "../../Utils/formatDates";
import { Center, Spinner } from "@mfe/common/lib/components";
import { formatDate } from "@mfe/common/lib/utils";
import { Alert } from "../../Components/Alert";
import { CouncilTaxInformation } from "../../Components/CouncilTaxInformation";
import { HousingBenefitsInformation } from "../../Components/HousingBenefitsInformation";
import { EqualityInformation } from "../../Components/EqualityInformation";

interface Props {
  profile?: customerProfile;
  systemIds?: Array<SystemId>;
}

export const Profile = (props: Props) => {
  const [person, setPerson] = useState<customerProfile | undefined>();
  const [systemIds, setSystemIds] = useState<Array<SystemId> | undefined>();

  useEffect(() => {
    setPerson(props.profile);
  }, [props.profile]);

  useEffect(() => {
    setSystemIds(props.systemIds);
  }, [props.systemIds]);

  if (typeof person == "undefined") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const manageArrearsLink = ()=> {
    return null;
  }

  return (
    <>
      {person.cautionaryAlerts &&
        person.cautionaryAlerts.map((cautionaryAlert, index) => {
          return (
            <Alert
              index={index}
              title={`Warning: ${cautionaryAlert.alertCode}`}
              message={`Added ${formatCautionaryAlertsDate(
                cautionaryAlert.startDate
              )} by ${
                cautionaryAlert.modifiedBy
              }. Last reviewed ${formatCautionaryAlertsDate(
                cautionaryAlert.dateModified
              )}.`}
            />
          );
        })}

      <dl className="govuk-summary-list lbh-summary-list">
        <DescriptionListItem title="Name" testId="name">
          {person.title} {person.firstName} {person.surname}
        </DescriptionListItem>

        {/* Display preferred title+name only if it doesn't match the default title+name */}
        {((person.preferredTitle && person.preferredTitle != person.title) ||
          (person.preferredFirstName &&
            person.preferredFirstName != person.firstName) ||
          (person.preferredSurname &&
            person.preferredSurname != person.surname)) && (
          <DescriptionListItem title="Preferred Name" testId="preferredName">
            {(person.preferredTitle ? person.preferredTitle : person.title) +
              " "}
            {(person.preferredFirstName
              ? person.preferredFirstName
              : person.firstName) + " "}
            {person.preferredSurname ? person.preferredSurname : person.surname}
          </DescriptionListItem>
        )}

        {person.dateOfBirth && (
          <DescriptionListItem title="Date of Birth" testId="dateOfBirth">
            {formatDateOfBirth(person.dateOfBirth)}
          </DescriptionListItem>
        )}

        <DescriptionListItem title="Contact Details" testId="contactDetails">
          {person.allContactDetails &&
            person.allContactDetails.map((contactDetail, index) => {
              return (
                <div key={index} className="contact-detail">
                  <p>
                    <span
                      data-testid="contactDetailsContactType"
                      className="govuk-!-font-weight-bold"
                    >
                      {contactDetail.contactType} ({contactDetail.subType})
                    </span>
                    <span data-testid="contactDetailsDescription">
                      {contactDetail.description &&
                        " - " + contactDetail.description + ":"}
                    </span>
                    <br />
                    <span data-testid="contactDetailsValue">
                      {contactDetail.value}
                    </span>
                    <br />
                    <span data-testid="contactDetailsDataSource">
                      <span className="govuk-!-font-weight-bold">
                        Data Source:{" "}
                      </span>
                      {contactDetail.dataSourceName}
                    </span>
                  </p>
                </div>
              );
            })}
        </DescriptionListItem>

        <DescriptionListItem title="Address History" testId="tenures">
          {person.knownAddresses?.map((address, index) => {
            return (
              <p className="lbh-body-s" key={index}>
                <span data-testid="tenureFullAddress">
                  {address.fullAddress}
                </span>
                <br />
                <span data-testid="tenureStartDate">
                  <span className="govuk-!-font-weight-bold">Start date:</span>{" "}
                  {formatDate(address.startDate) || "N/A"}
                </span>
                <br />
                <span data-testid="tenureEndDate">
                  <span className="govuk-!-font-weight-bold">End date:</span>{" "}
                  {formatDate(address.endDate) || "N/A"}
                </span>
                <br />
                <span data-testid="tenureDataSource">
                  <span className="govuk-!-font-weight-bold">Data Source:</span>{" "}
                  {address.dataSourceName}
                </span>
                <span data-testid="tenureDetails">
                  <details
                    className="govuk-details lbh-details"
                    data-module="govuk-details"
                  >
                    <summary className="govuk-details__summary sv-details">
                      <span className="govuk-details__summary-text">
                        Household Members
                      </span>
                    </summary>
                    <div className="govuk-details__text sv-details">
                      <ul>
                        {address.householdMembers?.map((member, i) => {
                          return (
                            <li>
                              {member.fullName} (
                              {formatDateOfBirth(member.dateOfBirth)})
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </details>
                </span>
                <span data-testid="manageArrearsLink">
                  {manageArrearsLink() || ""}
                </span>
              </p>
            );
          })}
        </DescriptionListItem>
        <DescriptionListItem title="Types" testId="types">
          {person.personTypes?.join(", ")}
        </DescriptionListItem>
        <DescriptionListItem title="National Insurance Number" testId="nino">
          {person.niNo}
        </DescriptionListItem>
        <DescriptionListItem title="Place of Birth" testId="placeOfBirth">
          {person.placeOfBirth}
        </DescriptionListItem>
        <DescriptionListItem title="NHS number" testId="nhsNo">
          {person.nhsNumber}
        </DescriptionListItem>
        <DescriptionListItem
          title={"Pregnancy due Date"}
          testId={"pregnancyDueDate"}
        >
          {person.pregnancyDueDate &&
            formatDateOfBirth(person.pregnancyDueDate)}
        </DescriptionListItem>
        <DescriptionListItem
          title={"Accommodation Type"}
          testId={"accommodationType"}
        >
          {person.accommodationType}
        </DescriptionListItem>
        <DescriptionListItem
          title={"Housing Circumstance"}
          testId={"housingCircumstance"}
        >
          {person.housingCircumstance}
        </DescriptionListItem>
        <DescriptionListItem title={"Settled"} testId={"isSettled"}>
          {person.isSettled ? "Y" : "N"}
        </DescriptionListItem>
        <DescriptionListItem title={"Support worker"} testId={"supportWorker"}>
          {person.supportWorker?.fullName} {person.supportWorker?.phoneNumber}{" "}
          {person.supportWorker?.emailAddress}
        </DescriptionListItem>
        <DescriptionListItem title={"Gender"} testId={"gender"}>
          {person.gender}
        </DescriptionListItem>
        <DescriptionListItem title="Is a Minor" testId="isMinor">
          {person.isAMinor ? "Y" : "N"}
        </DescriptionListItem>
        <DescriptionListItem title="Date of Death" testId="dateOfDeath">
          {person.dateofDeath}
        </DescriptionListItem>
        <h3>System Ids</h3>
        {systemIds &&
          systemIds.map((systemId) => {
            return (
              <DescriptionListItem
                title={systemId.systemName}
                key={systemId.id}
                testId={systemId.systemName}
              >
                {systemId.id}
              </DescriptionListItem>
            );
          })}
        <CouncilTaxInformation councilTaxAccount={person.councilTaxAccount} />
        <HousingBenefitsInformation
          housingBenefitsAccount={person.housingBenefitsAccount}
        />
        <EqualityInformation equalityData={person.equalityInformation} />
      </dl>
    </>
  );
};
