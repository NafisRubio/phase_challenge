import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RightPanel from "./RightPanel";
import { setProps } from "./elementsSlice";

const mockStore = configureStore([]);

describe("RightPanel component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      elements: {
        value: [
          {
            id: 1,
            name: "Element 1",
            isSelected: true,
            parentPageId: 1,
            positionX: 0,
            positionY: 0,
            opacity: 0,
            color: "#FFFFFF",
          },
        ],
      },
      pages: {
        value: [
          {
            id: 1,
            isSelected: true,
          },
        ],
      },
    });

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <RightPanel />
      </Provider>
    );
  });

  it("renders the RightPanel component", () => {
    expect(component.getByText("X")).toBeInTheDocument();
  });

  it("dispatches setProps action when inputting X position", () => {
    const inputElement = component.getByLabelText("X");
    fireEvent.input(inputElement, { target: { value: "50" } });

    expect(store.dispatch).toHaveBeenCalledWith(setProps({ positionX: 50 }));
  });

  it("updates the color when inputting color value", () => {
    const colorPicker = component.getByTestId("color-picker");
    fireEvent.input(colorPicker, { target: { value: "#FF0000" } });

    expect(store.dispatch).toHaveBeenCalledWith(setProps({ color: "#ff0000" }));
  });
});
