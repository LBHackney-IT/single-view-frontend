import React from "react";

import { SummaryList, SummaryListItem } from "../summary-list";
import "./styles.scss";

export type CardRow = {
  label: string;
  value: string;
};

export interface CardRowsProp {
  rows: CardRow[];
}

export const CardRows = ({ rows }: CardRowsProp) => {
  return (
    <SummaryList variant="inline">
      {rows.map((row, index) => (
        <SummaryListItem key={index} title={`${row.label}:`}>
          {row.value}
        </SummaryListItem>
      ))}
    </SummaryList>
  );
};
