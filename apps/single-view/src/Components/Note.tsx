import React from "react";
import { Note as NoteInterface } from "../Interfaces";
import { formatDate } from "../Utils/formatDates";

interface Props {
  note: NoteInterface;
}

export const Note = (props: Props) => {
  const formatCategory = () => {
    const category =
      props.note.categorisation.subCategory ||
      props.note.categorisation.category ||
      "";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <>
      <div
        style={{ alignItems: "center", display: "flex", marginBottom: "1em" }}
      >
        <div style={{ marginRight: "1em" }}>
          <h5 className="lbh-heading-h5">{formatDate(props.note.createdAt)}</h5>
          <p className="lbh-body-s">{props.note.dataSource}</p>
          {props.note.jigsawCaseReferenceId && (
            <p className="lbh-body-s">
              Case reference is {props.note.jigsawCaseReferenceId}
            </p>
          )}
        </div>
        {props.note.categorisation.category && (
          <p className="lbh-body-s">
            <span className="govuk-tag lbh-tag lbh-tag--green">
              {formatCategory()}
            </span>
          </p>
        )}
      </div>
      <div className="sv-timeline__card">
        <div className="sv-timeline__card_title">
          <div style={{ marginRight: "1em", flexBasis: "15%" }}>
            <h5 className="lbh-heading-h5">{props.note.author.fullName}</h5>
          </div>
          <h6>{props.note.title}</h6>
          <p className="lbh-body-s">{props.note.description}</p>
        </div>
      </div>
    </>
  );
};
