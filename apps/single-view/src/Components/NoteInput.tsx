import React, { useEffect, useState } from "react";

type Props = {
  notePlaceholder?: string;
  submit: (data: any) => void;
  hasError?: string;
};

export const NoteInput = (props: Props): JSX.Element => {
  const [noteContent, setNoteContent] = useState("");
  const [category, setCategory] = useState("");
  const [hasError, setHasError] = useState(props.hasError || "");

  useEffect(() => {
    setHasError("");
  }, [noteContent, category]);

  const submitNote = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (noteContent.length > 0 && category.length > 0) {
      let categorisation = {
        category: category,
        subCategory: null,
        description: null,
      };

      props.submit({
        description: noteContent,
        categorisation: categorisation,
      });

      clearAll();
    } else {
      setHasError("You must add some text to your note");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        submitNote(e);
      }}
    >
      <div className="note-input-wrapper">
        <div className="govuk-form-group lbh-form-group">
          <textarea
            name="more-detail"
            id="moreDetail"
            data-testid="description"
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
              data-testid="subCategory"
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
            <span className="govuk-visually-hidden">Error:</span>
            {hasError}
          </span>
        )}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button
            data-testid="clearAll"
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
            data-testid="submit"
            type="submit"
            className="govuk-button lbh-button lbh-button--secondary"
            data-module="govuk-button"
            style={{ marginTop: 0 }}
            aria-disabled={!hasContent()}
            disabled={!hasContent()}
          >
            Save
          </button>
        </div>
      </div>
    </form>
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
};
