import React from "react";
import { render } from "@testing-library/react";
import LeftPanel from "./LeftPanel";
import {Provider} from "react-redux";
import Elements from "./Elements";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("LeftPanel component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      elements: {
        value: [
          {
            id: 'A1',
            name: 'Element 1',
            index: 0,
            isSelected: true,
            parentPageId: 'AB',
            positionX: 10,
            positionY: 10,
            opacity: 100,
            color: '#205168',
          }
        ],
      },
      pages: {
        value: [
          {
            name: 'Page 1',
            index: 0,
            isSelected: true,
            id: 'AB'
          },
        ],
      },
    });

    store.dispatch = jest.fn();

    component = render(
      <Provider store={store}>
        <LeftPanel/>
      </Provider>
    );
  });

  it("renders the LeftPanel component without errors", () => {
    render(
      <Provider store={store}>
        <LeftPanel/>
      </Provider>
    )
    // If no errors are thrown during rendering, the test passes
  });

  it("renders both Pages and Elements components", () => {
    const pagesComponent = component.getByText("Page 1");
    const elementsComponent = component.getByText("Element 1");

    expect(pagesComponent).toBeInTheDocument();
    expect(elementsComponent).toBeInTheDocument();
  });
});
