import React from "react";

import "./styles.scss";

const CrossIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 5L23 23M23 5L5 23"
        stroke="inherit"
        strokeWidth="6"
        strokeLinecap="square"
      />
    </svg>
  );
};

const TickIcon = () => {
  return (
    <svg
      width="31"
      height="24"
      viewBox="0 0 31 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26 5L12 19L5 12"
        stroke="inherit"
        strokeWidth="6"
        strokeLinecap="square"
      />
    </svg>
  );
};

interface ChecklistProps {
  items: {
    label: string;
    success: boolean;
  }[];
}

export const Checklist = ({ items }: ChecklistProps) => {
  return (
    <ul className="mtfh-checklist">
      {items.map((item, index) => (
        <li key={index}>
          <span className={`mtfh-checklist__${item.success ? "tick" : "cross"}-icon`}>
            {item.success ? <TickIcon /> : <CrossIcon />}
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
};
