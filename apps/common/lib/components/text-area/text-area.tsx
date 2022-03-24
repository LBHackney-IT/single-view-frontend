import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react";

import classNames from "classnames";

import { pluralize, widthOverrides } from "../../utils";

import "./styles.scss";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  maxLength?: number;
  error?: boolean;
  override?: number;
}

const getLengthOfValue = (
  initialValue: string | number | readonly string[] | undefined,
) => {
  if (typeof initialValue === "string") {
    return initialValue.length;
  }
  if (Array.isArray(initialValue)) {
    return initialValue.join(",").length;
  }
  return String(initialValue || "").length;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { maxLength, error, className, onChange, override, ...props },
  ref,
) {
  const { value, defaultValue } = props;
  const isControlled = value !== undefined;
  const initialValue = value || defaultValue;

  const [characterCount, setCharacterCount] = useState(getLengthOfValue(initialValue));

  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (
        event?.currentTarget?.value !== undefined &&
        !isControlled &&
        maxLength !== undefined
      ) {
        setCharacterCount(String(event.currentTarget.value).length);
      }

      if (typeof onChange === "function") {
        onChange(event);
      }
    },
    [onChange, maxLength, isControlled],
  );

  const exceedingValue = useMemo(
    () =>
      maxLength !== undefined &&
      maxLength - (isControlled ? getLengthOfValue(value) : characterCount),
    [maxLength, characterCount, value, isControlled],
  );

  const textareaClasses = classNames(
    "govuk-textarea",
    "lbh-textarea",
    { "govuk-textarea--error": error },
    "lbh-character-count",
    widthOverrides(override),
    className,
  );

  const messageClasses = classNames(
    { "govuk-hint": exceedingValue !== false && exceedingValue >= 0 },
    "govuk-character-count__message",
    {
      "govuk-error-message": exceedingValue !== false && exceedingValue < 0,
    },
    widthOverrides(override),
  );

  return (
    <>
      <textarea
        ref={ref}
        className={textareaClasses}
        onChange={onChangeHandler}
        {...props}
      />
      {maxLength !== undefined && exceedingValue !== false && (
        <span className={messageClasses} aria-live="polite">
          {exceedingValue >= 0
            ? `You have ${exceedingValue} ${pluralize(
                "character",
                exceedingValue,
              )} remaining`
            : `You have ${Math.abs(exceedingValue)} ${pluralize(
                "character",
                exceedingValue,
              )} too many`}
        </span>
      )}
    </>
  );
});
