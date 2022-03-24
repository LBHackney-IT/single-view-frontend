import React, { forwardRef } from "react";

import cn from "classnames";

import { widthOverrides } from "../../utils";

import type * as Polymorphic from "@radix-ui/react-polymorphic";
import "./styles.scss";

const AddIcon = () => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M6.94 0L5 0V12H6.94V0Z" />
      <path d="M12 5H0V7H12V5Z" />
    </svg>
  );
};

const ChevronIcon = () => {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H8.54573L20 10H11.4543L0 0Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 22L8.54573 22L20 10H11.4543L0 22Z"
        fill="#96CCAE"
      />
    </svg>
  );
};

export interface ButtonProps {
  variant?: "primary" | "secondary" | "chevron" | "add";
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  override?: number;
}

export type ButtonComponent = Polymorphic.ForwardRefComponent<"button", ButtonProps>;

export const Button: ButtonComponent = forwardRef(function Button(
  {
    as: ButtonComp = "button",
    variant = "primary",
    isLoading = false,
    loadingText,
    isDisabled,
    children,
    className,
    override,
    ...props
  },
  ref,
) {
  const buttonClasses = cn(
    "govuk-button",
    "lbh-button",
    {
      "govuk-button--primary lbh-button--add": variant === "add",
      "lbh-button--chevron": variant === "chevron",
      "govuk-button--secondary lbh-button--secondary": variant === "secondary",
      "lbh-button--disabled govuk-button--disabled": isDisabled,
    },
    widthOverrides(override),
    className,
  );

  const disabled = isDisabled || isLoading || undefined;

  return (
    <ButtonComp
      ref={ref}
      className={buttonClasses}
      type={ButtonComp === "button" ? "button" : undefined}
      disabled={ButtonComp === "button" ? disabled : undefined}
      aria-disabled={disabled}
      {...props}
    >
      {variant === "add" && !isLoading && <AddIcon />}
      {isLoading && (
        <span className="button-loading-indicator">
          <span>Loading...</span>
        </span>
      )}
      {isLoading && loadingText ? loadingText : children}
      {variant === "chevron" && <ChevronIcon />}
    </ButtonComp>
  );
});
