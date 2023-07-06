import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Elements from "./Elements";
import {selectPage, setProps} from "./elementsSlice";

const mockStore = configureStore([]);

describe("Elements component", () => {
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
          },
          {
            id: 2,
            name: "Element 2",
            isSelected: false,
            parentPageId: 1,
          },
        ],
      },
      pages: {
        value: [
          {
            id: 1,
            isSelected: true,
          },
          {
            id: 2,
            isSelected: false,
          },
        ],
      },
    });

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <Elements/>
      </Provider>
    );
  });

  it("renders the Elements component", () => {
    expect(component.getByText("Elements")).toBeInTheDocument();
  });

  it("dispatches selectPage action on element click", () => {
    fireEvent.click(component.getByText("Element 1"));
    expect(store.dispatch).toHaveBeenCalledWith(selectPage({
      id: 1,
      isSelected: true,
      name: "Element 1",
      parentPageId: 1,
    }));
  });

  it("sets the editableElement state on element double click", () => {
    fireEvent.doubleClick(component.getByText("Element 1"));
    expect(component.getByTestId('element-editor')).toBeInTheDocument()
  });

  it("does not dispatch selectPage action on non-selected element click", () => {
    fireEvent.click(component.getByText("Element 2"));
    expect(store.dispatch).not.toHaveBeenCalledWith(selectPage({id: 2}));
  });
});
