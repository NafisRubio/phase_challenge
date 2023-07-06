import React from "react";
import styled from "styled-components";
import ColorPicker from "./ColorPicker";
import {useDispatch, useSelector} from "react-redux";
import {setProps} from "./elementsSlice";

const RightPanelWrapper = styled.div`
  padding: 8px;
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 16px auto minmax(0, 1fr);
  grid-gap: 8px;
`;
const RightPanel = () => {
  const elements = useSelector((state) => state.elements.value)
  const selectedElement = elements.find(element => element.isSelected)

  const pages = useSelector((state) => state.pages.value)
  const selectedPage = pages.find(page => page.isSelected)


  const dispatch = useDispatch()

  const setPositionFn = (event, positionKey) => {
    let {value} = event.target
    if (positionKey !== 'color') {
      value = parseInt(value)
    }
    const updateData = {
      [positionKey]: value
    }
    dispatch(setProps(updateData))
  }

  return (
    <RightPanelWrapper>
      <Label>
        X <input type="number"
                 min={0}
                 max={999}
                 value={selectedPage.id === selectedElement.parentPageId ? selectedElement.positionX : 0}
                 onInput={event => setPositionFn(event, 'positionX')}
      />
      </Label>
      <Label>
        Y <input type="number"
                 min={0}
                 max={999}
                 value={selectedPage.id === selectedElement.parentPageId ? selectedElement.positionY : 0}
                 onInput={event => setPositionFn(event, 'positionY')}
      />
      </Label>
      <Label>
        O <input
        type="number"
        min={0}
        max={100}
        value={selectedPage.id === selectedElement.parentPageId ? selectedElement.opacity : 0}
        onInput={event => setPositionFn(event, 'opacity')}
      />
        <input
          type="range"
          min={0}
          max={100}
          value={selectedPage.id === selectedElement.parentPageId ? selectedElement.opacity : 1}
          onInput={event => setPositionFn(event, 'opacity')}
        />
      </Label>
      <Label>
        B <ColorPicker
        color={selectedPage.id === selectedElement.parentPageId ? selectedElement.color : '#FFF'}
        onInput={event => setPositionFn(event, 'color')}
      /> {selectedPage.id === selectedElement.parentPageId ? selectedElement.color.toString().toUpperCase() : '#FFF'}
      </Label>
    </RightPanelWrapper>
  );
};

export default RightPanel;
