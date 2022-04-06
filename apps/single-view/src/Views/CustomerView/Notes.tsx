import React from "react";
import { Note } from "../../Components";
import { Note as NoteInterface } from "../../Interfaces/notesInterfaces";

interface Props {
  notes: NoteInterface[];
}

export const Notes = (props: Props): JSX.Element => {
  return (
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
  );
};
