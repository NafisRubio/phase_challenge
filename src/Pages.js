import React, {useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectPage, setProps} from "./pagesSlice";
import ListElement from "./ListElement";

const PagesWrapper = styled.div`
  border-bottom: 1px solid;
  padding-bottom: 16px;
`;
const Pages = () => {
  const [editableElement, setEditableElement] = useState(null);
  const pages = useSelector((state) => state.pages.value)

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
    <PagesWrapper>
      <h4>Pages</h4>
      {
        pages.map(
          (page, index) => (
            <ListElement
              key={index}
              name={page.name}
              isSelected={page.isSelected}
              onClick={() => onClick(page)}
              editable={editableElement === page.id}
              onDoubleClick={() => onDoubleClick(page)}
              onBlur={onBlur}
            />
          )
        )
      }
    </PagesWrapper>
  );
};

export default Pages;
