import React from "react";

interface Props {
  label: string;
  hint?: string;
  errorMsg?: string;
  value?: string;
  id: string;
  name: string;
  type: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = (props) => {
  return (
    <div
      className={`lbh-form-group govuk-form-group ${
        props.error && "govuk-form-group--error"
      }`}
    >
      <label className="govuk-label lbh-label" htmlFor={props.id}>
        {props.label}
      </label>
      {props.hint && (
        <span id={`${props.id}-hint`} className="govuk-hint lbh-hint">
          {props.hint}
        </span>
      )}
      {props.error && (
        <span
          id={`${props.id}-error`}
          className="govuk-error-message lbh-error-message"
        >
          <span className="govuk-visually-hidden">Error:</span> {props.errorMsg}
        </span>
      )}
      <input
        className={`lbh-input govuk-input ${
          props.error && "govuk-input--error"
        }`}
        id={props.id}
        name={props.name}
        defaultValue={props.value}
        type={props.type}
        aria-describedby={props.name}
        onChange={props.onChange}
      />
    </div>
  );
};
