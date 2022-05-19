import React, { useEffect, useState } from "react";

type Props = {
  notePlaceholder?: string;
  submit: (data: any) => void;
  hasError?: string;
};

type SubCategory = {
  id: string;
  value: string;
};

export const NoteInput = (props: Props): JSX.Element => {
  const [noteContent, setNoteContent] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [hasError, setHasError] = useState(props.hasError || "");

  useEffect(() => {
    setHasError("");
  }, [noteContent, setSubCategory]);

  const submitNote = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (noteContent.length < 1) {
      setHasError("You must add some text to your note");
      return;
    }

    let categorisation = {
      category: "Single View",
      subCategory: subCategory,
      description: null,
    };

    Promise.resolve(
      props.submit({
        description: noteContent,
        categorisation: categorisation,
      })
    )
      .then(() => {
        clearAll();
      })
      .catch((reason) => {
        setHasError(reason.message);
      });
  };

  const hasContent = (): boolean => {
    return noteContent.length > 0 || subCategory.length > 0;
  };

  const clearAll = () => {
    setNoteContent("");
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategory(e.target.value);
  };

  const subCategories = [
    { id: "housingBenefits", value: "Housing Benefits" },
    { id: "councilTax", value: "Council Tax" },
    { id: "housingNeeds", value: "Housing Needs" },
    { id: "rentIncome", value: "Rent & Income" },
  ];

  return (
    <form
      onSubmit={(e) => {
        submitNote(e);
      }}
    >
      <div className="note-input-wrapper">
        <div className="govuk-form-group lbh-form-group">
          <div className="govuk-radios govuk-radios--inline lbh-radios">
            {subCategories.map((s: SubCategory, i: number) => {
              return (
                <div className="govuk-radios__item" key={i}>
                  <input
                    className="govuk-radios__input"
                    id={s.id}
                    name="subcategory"
                    type="radio"
                    value={s.value}
                    onChange={onCategoryChange.bind(this)}
                  />
                  <label
                    className="govuk-label govuk-radios__label"
                    htmlFor={s.id}
                  >
                    {s.value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
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
};
