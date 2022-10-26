import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { SearchResident } from "../../Gateways";
import { housingSearchResults } from "../../Interfaces";
import { getCookie } from "../../Utils";
import { Input } from "../../Components";

interface myProps {
  setResultsFunction: (searchResults: housingSearchResults) => void;
  firstName: string | null;
  lastName: string | null;
  addressLine1: string | null;
  postCode: string | null;
  dateOfBirth: string | null;
}

export const SearchByResident = (props: myProps): JSX.Element => {
  const [firstName, setFirstName] = useState(props.firstName || "");
  const [lastName, setLastName] = useState(props.lastName || "");
  const [addressLine1, setAddressLine1] = useState(props.addressLine1 || "");
  const [postCode, setPostcode] = useState(props.postCode || "");
  const [dateOfBirth, setDateOfBirth] = useState(props.dateOfBirth || "");
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [searching, setIsSearching] = useState<boolean>(false);

  const anyFieldFilled: boolean = ![
    firstName,
    lastName,
    addressLine1,
    postCode,
    dateOfBirth,
  ].every((value) => value === "");

  const history = useHistory();

  function clearSearchFields() {
    window.history.pushState({}, document.title, "/search");
    const fieldIds = [
      "firstName",
      "lastName",
      "addressLine1",
      "postcode",
      "dateOfBirth",
    ];
    for (let i = 0; i < fieldIds.length; i++) {
      let field = document.getElementById(fieldIds[i]) as HTMLInputElement;
      if (field) {
        field.value = "";
      }
    }
    const header = document.getElementById(
      "single-spa-application:@mfe/header"
    );
    setFirstName("");
    setLastName("");
    setAddressLine1("");
    setPostcode("");
    setDateOfBirth("");
    header && header.scrollIntoView();
  }

  const joinAddresses = (): string => {
    return [addressLine1, postCode].filter((term) => term !== "").join(" ");
  };

  const validateAndSetDateOfBirth = (dateOfBirth: string) => {
    const dateOfBirthYear = parseInt(dateOfBirth.split("-")[0]);
    const currentYear = new Date().getFullYear();

    setDateOfBirthError(dateOfBirthYear > currentYear);

    if (!dateOfBirthError) {
      setDateOfBirth(dateOfBirth);
    }
  };
  function searchForPerson() {
    if (firstName && lastName) {
      handleSearch().then((r) => {
        const section = document.querySelector("#results");
        section?.scrollIntoView();
        setIsSearching(false);
      });
      setIsSearching(true);
    }
  }

  const handleSearch = async () => {
    function getDateOfBirth() {
      if (dateOfBirth) {
        const dateOfBirthAr = dateOfBirth.split("-");
        return `${dateOfBirthAr[2]}-${dateOfBirthAr[1]}-${dateOfBirthAr[0]}`;
      }
      return null;
    }

    try {
      let searchResults = await SearchResident({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        address: joinAddresses(),
        dateOfBirth: getDateOfBirth(),
        jigsawToken: getCookie("jigsawToken"),
      });
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
        <div className="govuk-grid-column-one-half">
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
                setIsSearching(true);
                setFirstNameError(false);
                setLastNameError(false);

                let path = `/search?firstName=${firstName.trim()}&lastName=${lastName.trim()}`;
                if (addressLine1) {
                  path += `&addressLine1=${addressLine1.trim()}`;
                }
                if (postCode) {
                  path += `&postCode=${postCode.trim()}`;
                }
                if (dateOfBirth) {
                  path += `&dateOfBirth=${dateOfBirth}`;
                }
                history.push(path);
                searchForPerson();
                window.document.cookie = `searchResidentPath=${path}`;
              }
            }}
          >
            <Input
              label="* First name or initial"
              errorMsg="First name is mandatory"
              id="firstName"
              name="firstName"
              value={props.firstName || ""}
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
              value={props.lastName || ""}
              error={lastNameError}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              label="First line of address"
              id="addressLine1"
              value={props.addressLine1 || ""}
              name="addressLine1"
              type="text"
              onChange={(e) => setAddressLine1(e.target.value)}
            />
            <Input
              label="Postcode"
              id="postcode"
              name="postcode"
              value={props.postCode || ""}
              type="text"
              onChange={(e) => setPostcode(e.target.value)}
            />
            <Input
              label="Date of birth"
              errorMsg="Date of birth cannot be in future"
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              error={dateOfBirthError}
              value={props.dateOfBirth || ""}
              onChange={(e) => validateAndSetDateOfBirth(e.target.value)}
            />
            {searching ? (
              <div className="sv-spinner">
                <svg
                  viewBox="0 0 42 42"
                  stroke="#00703c"
                  width="50"
                  height="50"
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(3 3)" strokeWidth="5">
                      <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                      <path
                        d="M36 18c0-9.94-8.06-18-18-18"
                        transform="rotate(112.708 18 18)"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            ) : (
              <button
                data-testid={"searchButton"}
                className="govuk-button lbh-button govuk-button--start"
              >
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
          {anyFieldFilled && (
            <button
              id={"clearSearchButton"}
              data-testid={"clearSearchButton"}
              style={{ marginRight: 30 }}
              className="govuk-button lbh-button"
              onClick={() => {
                clearSearchFields();
              }}
            >
              Clear Search
            </button>
          )}
        </div>
      </div>
    </>
  );
};
