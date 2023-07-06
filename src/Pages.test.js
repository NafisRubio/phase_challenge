import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Pages from "./Pages";
import { selectPage, setProps } from "./pagesSlice";

const mockStore = configureStore([]);

describe("Pages component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      pages: {
        value: [
          {
            name: 'Page 1',
            index: 0,
            isSelected: true,
            id: 'AB'
          },
          {
            name: 'Page 2',
            index: 1,
            isSelected: false,
            id: 'CD'
          }
        ],
      },
    });

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <Pages />
      </Provider>
    );
  });

  it("renders the Pages component", () => {
    expect(component.getByText("Pages")).toBeInTheDocument();
  });

  it("dispatches selectPage action on element click", () => {
    fireEvent.click(component.getByText("Page 1"));
    expect(store.dispatch).toHaveBeenCalledWith(selectPage({
      id: "AB",
      index: 0,
      isSelected: true,
      name: "Page 1",
    }));
  });

  it("sets the editableElement state on element double click", () => {
    fireEvent.doubleClick(component.getByText("Page 1"));
    expect(component.getByTestId('element-editor')).toBeInTheDocument()
  });
});
