import React from "react";

import locale from "../../locale";
import { ErrorSummary, ErrorSummaryProps } from "./error-summary";

interface FormErrorSummaryProps extends Partial<Omit<ErrorSummaryProps, "description">> {
  id: string;
  prefix: string;
  errors: Record<string, string>;
}

const { error } = locale.components.formErrorSummary;

export const FormErrorSummary = ({
  id,
  prefix,
  errors,
  title = error,
  ...props
}: FormErrorSummaryProps): JSX.Element => {
  return (
    <ErrorSummary id={id} title={title} {...props}>
      <ul className="govuk-list govuk-error-summary__list">
        {(Object.keys(errors) as Array<keyof typeof errors>)
          .filter((key) => errors[key])
          .map((key) => {
            return (
              <li key={key}>
                <a href={`#${prefix}-${key}`}>{errors[key]}</a>
              </li>
            );
          })}
      </ul>
    </ErrorSummary>
  );
};
