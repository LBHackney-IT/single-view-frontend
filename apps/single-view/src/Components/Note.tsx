import React from "react";
import { Note as NoteInterface } from "../Interfaces";
import { formatDate } from "../Utils/formatDates";

interface Props {
  note: NoteInterface;
}

export const Note = (props: Props) => {
  return (
    <>
      <div
        style={{ alignItems: "center", display: "flex", marginBottom: "1em" }}
      >
        <div style={{ marginRight: "1em" }}>
          <h5 className="lbh-heading-h5">{formatDate(props.note.createdAt)}</h5>
        </div>
        {props.note.targetType && (
          <p className="lbh-body-s">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              {props.note.categorisation.category.charAt(0).toUpperCase() +
                props.note.categorisation.category.slice(1)}
            </span>
          </p>
        )}
      </div>
      <div className="sv-timeline__card">
        <div className="sv-timeline__card_title">
          <div style={{ marginRight: "1em", flexBasis: "15%" }}>
            <h5 className="lbh-heading-h5">{props.note.author.fullName}</h5>
          </div>
          <p className="lbh-body-s">{props.note.description}</p>
        </div>
      </div>
    </>
  );
};
