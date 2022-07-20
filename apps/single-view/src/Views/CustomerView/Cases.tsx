import { Center, Spinner } from "@mfe/common/lib/components";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getCasesByCustomerId } from "../../Gateways/JigsawCases";
import { getCookie } from "../../Utils";
import { jigsawCasesResponse, UrlParams } from "../../Interfaces";

interface Props {
  customerId?: string;
}

export const Cases = (props: Props): JSX.Element => {
  const { id } = useParams<UrlParams>();
  const [cases, setCases] = useState<jigsawCasesResponse>();

  const loadCases = async (customerId: string): Promise<void> => {
    try {
      let cases = await getCasesByCustomerId(
        props.customerId || "",
        getCookie("jigsawToken")
      );
    } catch (e: any) {
      console.log(`Error is ${e.message}`);
    }
  };

  if (typeof cases == "undefined") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  {
    return cases.currentCase ? (
      <div className="govuk-inset-text lbh-inset-text" data-testid="notFound">
        There was an active case found.
      </div>
    ) : (
      <div className="govuk-inset-text lbh-inset-text" data-testid="notFound">
        There were no active cases found.
      </div>
    );
  }
};
