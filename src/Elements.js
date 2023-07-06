import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectPage, setProps} from "./elementsSlice";
import ListElement from "./ListElement";

const ElementsWrapper = styled.div``;
const Elements = () => {
  const [editableElement, setEditableElement] = useState(null);

  const elements = useSelector((state) => state.elements.value)

  const getElementsRecursive = (elements, parentPageId) => {
    const filterElements = elements.filter(element => element.parentPageId === parentPageId)
    const arr = filterElements.map(element => {
      if (element.elements && element.elements.length) {
        const children = getElementsRecursive(element.elements, parentPageId)
        return children.concat(element)
      }
      return element
    })
    return arr.flat()
  }

  const pages = useSelector((state) => state.pages.value)
  const selectedPage = pages.find(page => page.isSelected)

  const dispatch = useDispatch()

  const onClick = (page) => {
    dispatch(selectPage(page))
    setEditableElement(null); // Reset editable state on element selection
  }
  const onDoubleClick = (page) => {
    setEditableElement(page.id);
  };
  const onBlur = (name) => {
    dispatch(setProps({name})) // Reset position on blur (if not moved
    setEditableElement(null); // Reset editable state on blur
  };

  return (
    <ElementsWrapper>
      <h4>Elements</h4>
      {
        elements.map(
          (page, index) => (
            selectedPage.id === page.parentPageId ?
              <ListElement
                key={index}
                name={page.name}
                isSelected={page.isSelected}
                onClick={() => onClick(page)}
                editable={editableElement === page.id}
                onDoubleClick={() => onDoubleClick(page)}
                onBlur={onBlur}
              /> :
              ''
          )
        )
      }
    </ElementsWrapper>
  );
};

export default Elements;
