import React, { useMemo } from "react";

import "./styles.scss";

const SuccessIcon = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="22.5"
        cy="22.5"
        r="21.75"
        fill="white"
        stroke="#00664F"
        strokeWidth="1.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35 15.5127L18.775 33L11 24.6201L14.2591 21.1074L18.775 25.9746L31.7409 12L35 15.5127Z"
        fill="#00664F"
      />
    </svg>
  );
};
const WarningIcon = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="22.5"
        cy="22.5"
        r="21.75"
        fill="white"
        stroke="#BE3A34"
        strokeWidth="1.5"
      />
      <path
        d="M24.2969 26.6587H20.6035L19.8315 11.8701H25.0688L24.2969 26.6587ZM19.771 31.8354C19.771 30.9878 19.998 30.347 20.4521 29.9131C20.9062 29.4792 21.5672 29.2622 22.4351 29.2622C23.2726 29.2622 23.9185 29.4842 24.3726 29.9282C24.8368 30.3722 25.0688 31.008 25.0688 31.8354C25.0688 32.6326 24.8368 33.2633 24.3726 33.7275C23.9084 34.1816 23.2625 34.4087 22.4351 34.4087C21.5874 34.4087 20.9315 34.1867 20.4673 33.7427C20.0031 33.2886 19.771 32.6528 19.771 31.8354Z"
        fill="#BE3A34"
      />
    </svg>
  );
};

const DefaultIcon = () => {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="22.5"
        cy="22.5"
        r="21.75"
        fill="white"
        stroke="#0B0C0C"
        strokeWidth="1.5"
      />
      <path
        d="M20.2251 12.7026C20.2251 11.1991 21.0627 10.4473 22.7378 10.4473C24.4129 10.4473 25.2505 11.1991 25.2505 12.7026C25.2505 13.4191 25.0386 13.9792 24.6147 14.3828C24.201 14.7764 23.5754 14.9731 22.7378 14.9731C21.0627 14.9731 20.2251 14.2163 20.2251 12.7026ZM25.0386 34H20.4219V17.0771H25.0386V34Z"
        fill="#0B0C0C"
      />
    </svg>
  );
};

interface StatusHeadingProps {
  title: string;
  variant?: "base" | "success" | "warning";
}

export const StatusHeading = ({ title, variant = "base" }: StatusHeadingProps) => {
  const icon = useMemo(() => {
    if (variant === "success") {
      return <SuccessIcon />;
    }
    if (variant === "warning") {
      return <WarningIcon />;
    }
    return <DefaultIcon />;
  }, [variant]);

  return (
    <div className="mtfh-status-heading">
      {icon}
      <h4 className="lbh-heading-h4 mtfh-status-heading__title">{title}</h4>
    </div>
  );
};
