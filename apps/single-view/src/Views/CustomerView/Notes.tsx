import React from "react";
import { Note, NoteInput } from "../../Components";
import { Note as NoteInterface } from "../../Interfaces/notesInterfaces";
import { Link } from "@mfe/common/lib/components";

interface Props {
  notes?: NoteInterface[];
}

export const Notes = (props: Props): JSX.Element => {
  return props.notes ? (
    <>
      <Link href="?context=new#notes">Create a new note</Link>
      <NoteInput></NoteInput>
      <ol className="lbh-timeline">
        {props.notes?.map((note: NoteInterface, index: number) => {
          return (
            <li
              className="lbh-timeline__event lbh-timeline__event--minor"
              key={index}
            >
              <Note note={note} />
            </li>
          );
        })}
      </ol>
    </>
  ) : (
    <div className="govuk-inset-text lbh-inset-text">
      There were no notes found for this customer.
    </div>
  );
};
