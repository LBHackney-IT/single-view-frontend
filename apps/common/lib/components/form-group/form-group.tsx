import React, {
  Children,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from "react";

import classNames from "classnames";

import { widthOverrides } from "../../utils";
import { TextArea } from "../text-area";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

export interface FormGroupProps {
  id: string;
  label?: string;
  name?: string;
  hint?: string;
  error?: string | false;
  required?: boolean;
  children: ReactElement;
  override?: number;
}

export type FormGroupComponent = Polymorphic.ForwardRefComponent<"div", FormGroupProps>;

export const FormGroup: FormGroupComponent = forwardRef(function FormGroup(
  {
    as: FormGroupComp = "div",
    id,
    name,
    label,
    hint,
    error,
    required,
    children,
    className,
    override,
    ...props
  },
  ref,
) {
  const formGroupClasses = classNames(
    "govuk-form-group",
    {
      "govuk-form-group--error": !!error,
    },
    "lbh-form-group",
    widthOverrides(override),
    className,
  );

  const describedBy = useMemo(() => {
    const classes: string[] = [];
    if (hint) {
      classes.push(`${id}-hint`);
    }
    if (error) {
      classes.push(`${id}-error`);
    }
    return classes.join(" ");
  }, [id, hint, error]);

  const LabelComp =
    typeof FormGroupComp === "string" && (FormGroupComp as string) === "fieldset"
      ? "legend"
      : "label";

  const formGroup = (
    <FormGroupComp ref={ref} id={id} className={formGroupClasses} {...props}>
      <LabelComp className="govuk-label lbh-label" htmlFor={`${id}-field`}>
        {label}
        {required ? <sup aria-hidden="true">*</sup> : ""}
      </LabelComp>
      {!!hint && (
        <span id={`${id}-hint`} className="govuk-hint lbh-hint">
          {hint}
        </span>
      )}
      {!!error && (
        <span id={`${id}-error`} className="govuk-error-message lbh-error-message">
          <span className="govuk-visually-hidden">Error:</span> {error}
        </span>
      )}
      {!!children &&
        Children.only(
          cloneElement(children, {
            id: `${id}-field`,
            name,
            required,
            error: !!error,
            "aria-describedby": describedBy || undefined,
            ...children.props,
          }),
        )}
    </FormGroupComp>
  );

  return isValidElement(children) && children.type === TextArea ? (
    <div className="govuk-character-count">{formGroup}</div>
  ) : (
    formGroup
  );
});
