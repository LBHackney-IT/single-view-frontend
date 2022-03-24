import React from "react";

import locale from "../../locale";
import { ErrorSummary, ErrorSummaryProps } from "./error-summary";

interface StautsErrorSummaryProps extends Partial<ErrorSummaryProps> {
  id: string;
  code: number;
}

const { statusTitle, statusDescription } = locale.components.statusErrorSummary;

export const StatusErrorSummary = ({
  id,
  code,
  title = statusTitle(code),
  description = statusDescription(code),
  ...props
}: StautsErrorSummaryProps): JSX.Element => {
  return <ErrorSummary id={id} title={title} description={description} {...props} />;
};
