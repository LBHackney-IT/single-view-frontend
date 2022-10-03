import { Center, ErrorSummary, Spinner } from "@mfe/common/lib/components";
import React, { useEffect, useState } from "react";
import { getCasesByCustomerId } from "../../Gateways/JigsawCases";
import { getCookie } from "../../Utils";
import { jigsawCasesResponse } from "../../Interfaces";
import { CaseSummary } from "../../Components/CaseSummary";

interface Props {
  customerId?: string;
}

export const Cases = (props: Props): JSX.Element => {
  const [cases, setCases] = useState<jigsawCasesResponse | null>(null);
  const [getCasesError, setGetCasesError] = useState<boolean>(false);
  const [casesNotFoundError, setCasesNotFoundError] = useState<boolean>(false);

  const loadCases = async (customerId: string): Promise<void> => {
    setGetCasesError(false);
    try {
      let cases = await getCasesByCustomerId(
        customerId,
        getCookie("jigsawToken")
      );
      setCases(cases);
    } catch (e: any) {
      if (e.response.status == 404) {
        setCasesNotFoundError(true);
      } else {
        setGetCasesError(true);
      }
    }
  };

  useEffect(() => {
    if (props.customerId && props.customerId !== "jigsaw id not found") {
      loadCases(props.customerId);
    }
  }, [props.customerId]);
  const currentPathName = window.location.pathname;
  let jigsawTokenMessage;
  if (document.cookie.indexOf("jigsawToken") == -1) {
    // if jigsawToken is NOT set
    jigsawTokenMessage = [
      <p>
        If you have access to Jigsaw please{" "}
        <a
          href={`/jigsawLogin?redirect=${currentPathName}`}
          data-testid="jigsawLoginErrorSummary"
        >
          Log in to Jigsaw
        </a>
      </p>,
    ];
  } else {
    // jigsawToken set but still failed
    jigsawTokenMessage = [
      <p>You are signed in to Jigsaw - this is probably a system issue</p>,
    ];
  }

  if (getCasesError) {
    return (
      <ErrorSummary
        id="singleViewNotesError"
        title="Error"
        description="Unable to load cases."
        children={jigsawTokenMessage}
      />
    );
  }

  if (casesNotFoundError || props.customerId == "jigsaw id not found") {
    return (
      <p
        className="govuk-inset-text lbh-inset-text"
        data-testid="homelessnessCasesNotFound"
      >
        There were no active homelessness cases found for this customer.
      </p>
    );
  }

  return cases != null ? (
    <CaseSummary jigsawCaseResponse={cases} />
  ) : (
    <Center>
      <Spinner />
    </Center>
  );
};
