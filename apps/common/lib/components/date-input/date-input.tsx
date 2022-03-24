import React, { ComponentPropsWithoutRef, forwardRef } from "react";

import cn from "classnames";

import { NumberInput, NumberInputProps } from "../number-input";
import "./styles.scss";

export interface DateInputProps extends ComponentPropsWithoutRef<"div"> {
  id?: string;
  error?: string;
  required?: boolean;
  dayProps?: NumberInputProps;
  monthProps?: NumberInputProps;
  yearProps?: NumberInputProps;
  dayLabel?: string;
  monthLabel?: string;
  yearLabel?: string;
}

export const DateInput = forwardRef<HTMLDivElement, DateInputProps>(function DateInput(
  {
    id = "date-input",
    dayProps,
    monthProps,
    yearProps,
    dayLabel = "Day",
    monthLabel = "Month",
    yearLabel = "Year",
    error,
    required,
    className,
    ...props
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("govuk-date-input", "lbh-date-input", className)}
      {...props}
    >
      <div className="govuk-date-input__item">
        <label className="govuk-label lbh-label" htmlFor={`${id}-day`}>
          {dayLabel}
        </label>
        <NumberInput
          className="govuk-date-input__input govuk-input--width-2"
          name="day"
          required={required}
          maxLength={2}
          min={1}
          max={31}
          padStart={2}
          aria-label="Day"
          {...dayProps}
        />
      </div>
      <div className="govuk-date-input__item">
        <label className="govuk-label lbh-label" htmlFor={`${id}-month`}>
          {monthLabel}
        </label>
        <NumberInput
          className="govuk-date-input__input govuk-input--width-2"
          name="month"
          required={required}
          maxLength={2}
          min={1}
          max={12}
          padStart={2}
          aria-label="Month"
          {...monthProps}
        />
      </div>
      <div className="govuk-date-input__item">
        <label className="govuk-label lbh-label" htmlFor={`${id}-year`}>
          {yearLabel}
        </label>
        <NumberInput
          className="govuk-input govuk-date-input__input govuk-input--width-4"
          name="year"
          required={required}
          maxLength={4}
          padStart={4}
          aria-label="Year"
          {...yearProps}
        />
      </div>
    </div>
  );
});
