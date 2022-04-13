import React, { useEffect, useState } from "react";
import { Note, NoteInput } from "../../Components";
import { Note as NoteInterface } from "../../Interfaces/notesInterfaces";
import { Center, Link, Spinner } from "@mfe/common/lib/components";
import { useParams } from "react-router-dom";
import { UrlParams } from "../../Interfaces";
import { createNote } from "../../Gateways";

interface Props {
  notes?: NoteInterface[];
  displayNoteInput?: boolean;
}

export const Notes = (props: Props): JSX.Element => {
  const { id } = useParams<UrlParams>();
  const [notes, setNotes] = useState<Array<NoteInterface> | undefined>([]);
  const [displayNoteInput, setDisplayNoteInput] = useState<boolean>(
    !!props.displayNoteInput
  );

  useEffect(() => {
    setNotes(props.notes);
  }, [props.notes]);

  if (typeof notes == "undefined") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const submitNote = async (data: any): Promise<void> => {
    let note = await createNote(id, data);

    if (note) {
      setNotes([...notes, note]);
    } else {
      console.error("Failed to save note");
    }
  };

  return (
    <>
      <Link
        href="#notes"
        onClick={(e) => {
          e.preventDefault();
          setDisplayNoteInput(!displayNoteInput);
        }}
      >
        Create a new note
      </Link>

      {displayNoteInput && <NoteInput submit={submitNote} />}

      {notes.length > 0 ? (
        <ol className="lbh-timeline">
          {notes.map((note: NoteInterface, index: number) => {
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
      ) : (
        <div className="govuk-inset-text lbh-inset-text">
          There were no notes found for this customer.
        </div>
      )}
    </>
  );
};
