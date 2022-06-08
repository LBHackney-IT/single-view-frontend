import React, { useState } from "react";
import { SearchResident } from "../../Gateways/SearchResident";
import { housingSearchPerson } from "../../Interfaces";
import { getCookie } from "../../Utils/getCookie";
import { Input } from "../../Components";

interface myProps {
  setResultsFunction: (searchResults: housingSearchPerson[]) => void;
}

export const SearchByResident = (props: myProps): JSX.Element => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [postCode, setPostcode] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [searching, setIsSearching] = useState<boolean>(false);

  const joinAddresses = (): string => {
    return [addressLine1, postCode].filter((term) => term !== "").join(" ");
  };

  const handleSearch = async () => {
    try {
      let searchResults = await SearchResident(
        firstName.trim(),
        lastName.trim(),
        joinAddresses(),
        getCookie("jigsawToken")
      );
      props.setResultsFunction(searchResults);
      setIsSearching(false);
    } catch (e) {
      setIsSearching(false);
      console.log(e);
    }
  };

  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!firstName) {
                setFirstNameError(true);
              }
              if (!lastName) {
                setLastNameError(true);
              }
              if (firstName && lastName) {
                handleSearch();
                setIsSearching(true);
                setFirstNameError(false);
                setLastNameError(false);
              }
            }}
          >
            <Input
              label="* First name"
              errorMsg="First name is mandatory"
              id="firstName"
              name="firstName"
              type="text"
              error={firstNameError}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="* Last name"
              errorMsg="Last name is mandatory"
              id="lastName"
              name="lastName"
              type="text"
              error={lastNameError}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              label="First line of address"
              id="addressLine1"
              name="addressLine1"
              type="text"
              onChange={(e) => setAddressLine1(e.target.value)}
            />
            <Input
              label="Postcode"
              id="postcode"
              name="postcode"
              type="text"
              onChange={(e) => setPostcode(e.target.value)}
            />
            {searching ? (
              <div className="sv-spinner">
                <svg
                  viewBox="0 0 42 42"
                  stroke="#00703c"
                  width="50"
                  height="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(3 3)" stroke-width="5">
                      <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                      <path
                        d="M36 18c0-9.94-8.06-18-18-18"
                        transform="rotate(112.708 18 18)"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            ) : (
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
            )}
          </form>
        </div>
      </div>
    </>
  );
};
