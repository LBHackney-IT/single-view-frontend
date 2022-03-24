import React, {
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";

import cn from "classnames";

import { widthOverrides } from "../../utils";
import "./styles.scss";

export interface FieldsetProps extends ComponentPropsWithoutRef<"fieldset"> {
  heading: string | ReactElement<ComponentPropsWithoutRef<"h1">>;
  variant?: "base" | "small" | "medium" | "large" | "xlarge" | "hidden";
  indent?: boolean;
  error?: boolean | string;
  override?: number;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(function Fieldset(
  {
    variant = "base",
    indent = false,
    error,
    heading,
    children,
    className,
    override,
    ...props
  },
  ref,
) {
  return (
    <fieldset
      ref={ref}
      className={cn(
        "govuk-fieldset",
        "lbh-fieldset",
        {
          "mtfh-fieldset--indent": indent,
          "mtfh-fieldset--error": !!error,
        },
        widthOverrides(override),
        className,
      )}
      {...props}
    >
      <legend
        className={cn("govuk-fieldset__legend", {
          "govuk-fieldset__legend--s": variant === "small",
          "govuk-fieldset__legend--m": variant === "medium",
          "govuk-fieldset__legend--l": variant === "large",
          "govuk-fieldset__legend--xl": variant === "xlarge",
          "govuk-visually-hidden": variant === "hidden",
        })}
      >
        {typeof heading !== "string"
          ? isValidElement(heading) &&
            cloneElement(heading, {
              className: cn("govuk-fieldset__heading", heading.props.className),
            })
          : heading}
        {error && <div className="govuk-visually-hidden"> {error}</div>}
      </legend>
      <div className={cn("mtfh-fieldset__content")}>
        {error && (
          <span className="govuk-error-message lbh-error-message" aria-hidden="true">
            {error}
          </span>
        )}
        {children}
      </div>
    </fieldset>
  );
});
