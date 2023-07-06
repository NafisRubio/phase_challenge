import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Canvas from "./Canvas";
import {selectPage, setProps} from "./elementsSlice";

const mockStore = configureStore([]);

describe("Canvas", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      pages: {
        value: [
          {id: 1, isSelected: true},
          {id: 2, isSelected: false},
        ],
      },
      elements: {
        value: [
          {parentPageId: 1, positionX: 300, positionY: 400, opacity: 75, color: "blue", isSelected: false},
          {parentPageId: 1, positionX: 100, positionY: 200, opacity: 50, color: "red", isSelected: true},
          {parentPageId: 2, positionX: 500, positionY: 600, opacity: 100, color: "green", isSelected: false},
        ],
      },
    });

    component = render(
      <Provider store={store}>
        <Canvas/>
      </Provider>
    );
  });

  it("should dispatch selectPage action when a Block is clicked", () => {
    const block = component.getByTestId("block-1");

    fireEvent.click(block);

    const actions = store.getActions();
    const expected = [selectPage({
      parentPageId: 1,
      positionX: 100,
      positionY: 200,
      opacity: 50,
      color: "red",
      isSelected: true
    })]
    expect(actions).toEqual(expected);
  });

  it("should dispatch setProps action when a Block is dragged", () => {
    const block = component.getByTestId("block-0");

    fireEvent.mouseDown(block, {clientX: 100, clientY: 200});
    fireEvent.mouseMove(block, {clientX: 200, clientY: 300});
    fireEvent.mouseUp(block);

    const actions = store.getActions();
    expect(actions).toEqual([setProps({positionX: 400, positionY: 500})]);
  });
});
