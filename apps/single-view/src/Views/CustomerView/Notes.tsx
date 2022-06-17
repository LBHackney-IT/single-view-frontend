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
import { ListSnapshot } from "../../Components/ListSnapshot";

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
  const notesSnapshot = 5;

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
        <ListSnapshot list={notes} snapshot={notesSnapshot}>
          <ol className="lbh-timeline">
            {notes.map((note: NoteInterface, index: number) => {
              let attributes = {
                className: "lbh-timeline__event lbh-timeline__event--minor",
                key: index,
                "data-snapshot": index == notesSnapshot - 1 ? 1 : null,
                "data-testid": `note_${index}`,
              };
              return (
                <li {...attributes}>
                  <Note note={note} />
                </li>
              );
            })}
          </ol>
        </ListSnapshot>
      ) : (
        <div className="govuk-inset-text lbh-inset-text" data-testid="notFound">
          There were no notes found for this customer.
        </div>
      )}
    </>
  );
};
