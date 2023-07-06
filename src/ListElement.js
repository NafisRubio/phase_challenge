import React from 'react';
import styled from "styled-components";

const ListElementWrapper = styled.div`
  cursor: pointer;
`;
const ListElement = (
  {
    isSelected = false,
    name = '',
    editable = false,
    onClick = () => {
    },
    onDoubleClick = () => {
    },
    onBlur = () => {
    },
  }
) => {
  const handleDoubleClick = () => {
    if (!editable) {
      onDoubleClick();
    }
  };

  const handleBlur = (event) => {
    const {value} = event.target;
    onBlur(value);
    event.target.blur();
  };

  if (editable) {
    return (
      <input
        data-testid="element-editor"
        type="text"
        defaultValue={name}
        autoFocus
        onBlur={handleBlur}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleBlur(event);
          }
        }}
      />
    );
  } else {
    return (
      <ListElementWrapper
        onDoubleClick={handleDoubleClick}
        onClick={onClick}
      >
        {
          isSelected ?
            <strong>{name}</strong> :
            name
        }
      </ListElementWrapper>
    );
  }
};

export default ListElement;