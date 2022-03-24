import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import classNames from "classnames";

import { widthOverrides } from "../../utils";
import "./styles.scss";

export interface SelectProps extends ComponentPropsWithoutRef<"select"> {
  error?: boolean;
  override?: number;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { error, className, override, ...props },
  ref,
) {
  const selectClasses = classNames(
    "govuk-select",
    "lbh-select",
    { "govuk-select--error": error },
    widthOverrides(override),
    className,
  );
  return <select ref={ref} className={selectClasses} {...props} />;
});
