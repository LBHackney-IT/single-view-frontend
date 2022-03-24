import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import classNames from "classnames";

import { widthOverrides } from "../../utils";
import "./styles.scss";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: boolean;
  override?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, className, override, ...props },
  ref,
) {
  const inputClasses = classNames(
    "govuk-input",
    "lbh-input",
    {
      "govuk-input--error": error,
    },
    widthOverrides(override),
    className,
  );

  return <input ref={ref} className={inputClasses} {...props} />;
});
