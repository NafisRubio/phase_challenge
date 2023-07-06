import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import ListElement from "./ListElement";

describe("ListElement component", () => {
  it("renders a non-editable element with the provided name", () => {
    const name = "Example Element";
    const { getByText } = render(<ListElement name={name} />);
    const element = getByText(name);

    expect(element).toBeInTheDocument();
  });

  it("triggers onDoubleClick callback when double-clicking a non-editable element", () => {
    const onDoubleClickMock = jest.fn();
    const { getByText } = render(<ListElement name="Example Element" onDoubleClick={onDoubleClickMock} />);
    const element = getByText("Example Element");

    fireEvent.doubleClick(element);

    expect(onDoubleClickMock).toHaveBeenCalledTimes(1);
  });
});
