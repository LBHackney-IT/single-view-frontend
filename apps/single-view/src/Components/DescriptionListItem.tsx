import React from "react";

interface Props {
  title: string;
  testId: string;
}

export const DescriptionListItem: React.FC<Props> = (props) => {
  let isNull: boolean = props.children == null;
  return (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key govuk-!-width-one-half">
        <h5
          className={isNull ? "lbh-heading-h5 sv-null-field" : "lbh-heading-h5"}
        >
          {props.title}
        </h5>
      </dt>
      <dd className="govuk-summary-list__value">
        <div className="lbh-body-s" data-testid={props.testId}>
          {props.children}
        </div>
      </dd>
    </div>
  );
};
