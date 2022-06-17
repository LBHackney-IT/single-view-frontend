import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Note, NoteInput } from "../../Components";
import { createNote, getNotes } from "../../Gateways";
import { UrlParams, Note as NoteInterface, SystemId } from "../../Interfaces";
import { getCookie } from "../../Utils/getCookie";
import {
  Center,
  Link,
  Spinner,
  ErrorSummary,
} from "@mfe/common/lib/components";

interface Props {
  systemIds?: Array<SystemId>;
  displayNoteInput?: boolean;
  isHousing: boolean;
}

export const Notes = (props: Props): JSX.Element => {
  const { id } = useParams<UrlParams>();
  const [notes, setNotes] = useState<Array<NoteInterface>>();
  const [getNotesError, setGetNotesError] = useState<boolean>(false);
  const [displayNoteInput, setDisplayNoteInput] = useState<boolean>(
    !!props.displayNoteInput
  );

  const loadNotes = async (systemIds: Array<SystemId>): Promise<void> => {
    setGetNotesError(false);
    try {
      let notes = await getNotes(systemIds, getCookie("jigsawToken"));
      setNotes(notes);
    } catch (e: any) {
      setGetNotesError(true);
    }
  };

  const submitNote = async (data: any): Promise<void> => {
    let note = await createNote(id, data);
    setNotes([note, ...(notes || [])]);
  };

  useEffect(() => {
    if (props.systemIds) {
      loadNotes(props.systemIds);
    }
  }, [props.systemIds]);

  if (getNotesError) {
    return (
      <ErrorSummary
        id="singleViewNotesError"
        title="Error"
        description="Unable to load notes"
      />
    );
  }

  if (typeof notes == "undefined") {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      {props.isHousing && (
        <Link
          href="#notes"
          onClick={(e) => {
            e.preventDefault();
            setDisplayNoteInput(!displayNoteInput);
          }}
        >
          Create a new note
        </Link>
      )}

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
