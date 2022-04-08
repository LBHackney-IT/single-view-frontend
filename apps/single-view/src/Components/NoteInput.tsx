import React, { useEffect, useState } from "react";
import { Note, NoteCategory } from "../Interfaces";

type Props = {
  //   onSubmit: (note: Note, id?: number) => void;
  //   onCancel: () => void;
  notePlaceholder?: string;
};

export const NoteInput = (props: Props): JSX.Element => {
  const [noteContent, setNoteContent] = useState("");
  const [category, setCategory] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [noteContent, category]);

  let newNote: Note = {
    id: "",
    targetId: "",
    highlight: false,
    title: "Call to customer",
    description: noteContent,
    createdAt: `${new Date().getFullYear()}-${
      0 + new Date().getMonth() + 1
    }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    categorisation: {
      category: "appointments",
      subCategory: "",
      description: "",
    },
    targetType: "person",
    author: {
      fullName: "",
      email: "",
    },
  };

  return (
    <>
      <div className="govuk-form-group lbh-form-group">
        <ul>
          {Object.keys(NoteCategory).map((key, index) => {
            return (
              <li key={index}>
                {NoteCategory[key as keyof typeof NoteCategory]}
              </li>
            );
          })}
        </ul>

        <textarea
          name="more-detail"
          id="moreDetail"
          cols={30}
          rows={10}
          style={{ height: "150px" }}
          className="govuk-textarea lbh-textarea"
          onChange={(event) => setNoteContent(event.target.value)}
          placeholder={props.notePlaceholder || "Compose a new note here"}
          value={noteContent}
        ></textarea>
        <div
          className="govuk-form-group lbh-form-group"
          style={{ width: "50%" }}
        >
          <label className="govuk-label lbh-label" htmlFor="input-example">
            Category
          </label>
          <input
            className="govuk-input lbh-input"
            id="input-example"
            name="test-name"
            type="text"
            value={category}
            onChange={onCategoryChange}
          />
        </div>
      </div>
      <></>
      {hasError && (
        <span
          className="govuk-error-message lbh-error-message"
          style={{ marginTop: "1rem" }}
        >
          <span className="govuk-visually-hidden">Error:</span>You must add some
          text to your note
        </span>
      )}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          className="govuk-button lbh-button lbh-button--secondary"
          style={{ marginTop: 0, marginRight: "0.618em" }}
          onClick={clearAll}
          aria-disabled={!hasContent()}
          disabled={!hasContent()}
        >
          Clear All
        </button>
        <button
          id="saveNote"
          className="govuk-button lbh-button lbh-button--secondary"
          data-module="govuk-button"
          onClick={onNoteSubmit}
          style={{ marginTop: 0 }}
          aria-disabled={!hasContent()}
          disabled={!hasContent()}
        >
          Save
        </button>
      </div>
    </>
  );

  function hasContent(): boolean {
    return noteContent.length > 0 || category.length > 0;
  }

  function clearAll() {
    setNoteContent("");
    setCategory("");
  }

  function onCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value);
  }

  function onNoteSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (noteContent.length > 0 && category.length > 0) {
      //   props.onSubmit(newNote, props.id);
      clearAll();
    } else {
      setHasError(true);
    }
  }

  function displayTransform(id: string, display: string): string {
    return "@" + display;
  }
};
