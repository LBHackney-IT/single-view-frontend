import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { NoteInput } from "./NoteInput";

describe("Note Input", () => {
  it("should only submit when the note description has a value", () => {
    const { getByTestId } = render(<NoteInput submit={() => {}} />);

    expect(getByTestId(/submit/i)).toBeDisabled();
    fireEvent.change(getByTestId(/description/i), {
      target: { value: "test" },
    });
    expect(getByTestId(/submit/i)).not.toBeDisabled();
  });

  it("should clear all fields when Clear All is clicked", () => {
    const { getByTestId } = render(<NoteInput submit={() => {}} />);

    expect(getByTestId(/clearAll/i)).toBeDisabled();
    fireEvent.change(getByTestId(/description/i), {
      target: { value: "test" },
    });
    expect(getByTestId(/clearAll/i)).not.toBeDisabled();
    fireEvent.change(getByTestId(/subCategory/i), {
      target: { value: "test" },
    });
    fireEvent.click(getByTestId(/clearAll/i));
    expect(getByTestId(/description/i).getAttribute("value")).toBeNull();
    expect(getByTestId(/subCategory/i).getAttribute("value")).toEqual("");
  });
});
