import { Center, ErrorSummary, Spinner } from "@mfe/common/lib/components";
import React, { useEffect, useState } from "react";
import { getCasesByCustomerId } from "../../Gateways/JigsawCases";
import { getCookie } from "../../Utils";
import { jigsawCasesResponse, UrlParams } from "../../Interfaces";
import { CaseSummary } from "../../Components/CaseSummary";

interface Props {
  customerId?: string;
}

export const Cases = (props: Props): JSX.Element => {
  const [cases, setCases] = useState<jigsawCasesResponse>();
  const [getCasesError, setGetCasesError] = useState<boolean>(false);

  const loadCases = async (customerId: string): Promise<void> => {
    setGetCasesError(false);
    try {
      let cases = await getCasesByCustomerId(
        customerId,
        getCookie("jigsawToken")
      );
      setCases(cases);
    } catch (e: any) {
      setGetCasesError(true);
      console.log(`Error is ${e.message}`);
    }
  };

  useEffect(() => {
    if (props.customerId) {
      loadCases(props.customerId);
    }
  }, [props.customerId]);

  if (getCasesError) {
    return (
      <ErrorSummary
        id="singleViewNotesError"
        title="Error"
        description="Unable to load cases"
      />
    );
  }

  if (typeof cases == "undefined") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  {
    return cases != null ? (
      <CaseSummary jigsawCaseResponse={cases} />
    ) : (
      <div className="govuk-inset-text lbh-inset-text" data-testid="notFound">
        There were no active cases found.
      </div>
    );
  }
};
