import React, { useState } from "react";
import { SearchResident } from "../../Gateways/SearchResident";
import { Person } from "../../Interfaces/housingSearchInterfaces";

interface myProps {
  setResultsFunction: (searchResults: Person[]) => void;
}

export const SearchByResident = (props: myProps): JSX.Element => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [postCode, setPostcode] = useState("");

  let searchResults: Person[];

  const createSearch = (): string => {
    let searchTerms = [firstName, lastName];

    let formattedSearch = searchTerms.filter((term) => term !== "").join("+");

    return formattedSearch;
  };

  const joinAddresses = (): string => {
    return [addressLine1, postCode].filter((term) => term !== "").join(" ");
  };

  const handleSearch = async () => {
    try {
      searchResults = await SearchResident(createSearch(), joinAddresses());
      props.setResultsFunction(searchResults);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (firstName != "" && lastName != "") {
                handleSearch();
              }
            }}
          >
            <div className="govuk-form-group lbh-form-group">
              <label className="govuk-label lbh-label" htmlFor="firstName">
                * First name{" "}
                {<text style={{ fontStyle: "italic" }}> Mandatory</text>}
              </label>
              <input
                className="govuk-input lbh-input"
                id="firstName"
                name="firstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="govuk-form-group lbh-form-group">
              <label className="govuk-label lbh-label" htmlFor="lastName">
                * Last name{" "}
                {<text style={{ fontStyle: "italic" }}> Mandatory</text>}
              </label>
              <input
                className="govuk-input lbh-input"
                id="lastName"
                name="lastName"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="govuk-form-group lbh-form-group">
              <label className="govuk-label lbh-label" htmlFor="addressLine1">
                First Line of Address
              </label>
              <input
                className="govuk-input lbh-input"
                id="addressLine1"
                name="addressLine1"
                type="text"
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
            <div className="govuk-form-group lbh-form-group">
              <label className="govuk-label lbh-label" htmlFor="postcode">
                Postcode
              </label>
              <input
                className="govuk-input lbh-input"
                id="postcode"
                name="postcode"
                type="text"
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>

            <button className="govuk-button lbh-button govuk-button--start">
              Search
              <svg
                className="govuk-button__start-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="17.5"
                height="19"
                viewBox="0 0 33 40"
                aria-hidden="true"
                focusable="false"
              >
                <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
