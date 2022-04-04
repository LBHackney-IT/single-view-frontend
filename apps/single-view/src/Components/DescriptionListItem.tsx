import React from "react";

interface Props {
  title: string;
}

export const DescriptionListItem: React.FC<Props> = (props) => {
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key govuk-!-width-one-half">
        <h5 className="lbh-heading-h5">{props.title}</h5>
      </dt>
      <dd className="govuk-summary-list__value">
        <div className="lbh-body-s">{props.children}</div>
      </dd>
    </div>
  );
};
