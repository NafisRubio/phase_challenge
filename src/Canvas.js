import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {selectPage, setProps} from "./elementsSlice";

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Block = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  opacity: ${(props) => props.o};
  background: ${(props) => props.color || 'green'};
  outline: ${(props) => (props.active ? 1 : 0)}px solid #0274ff;
`;

const Canvas = () => {
  const pages = useSelector((state) => state.pages.value)
  const selectedPage = pages.find(page => page.isSelected)
  const elements = useSelector((state) => state.elements.value)

  const dispatch = useDispatch()

  const [dragging, setDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [draggedElement, setDraggedElement] = useState(null);

  const handleDragStart = (event, page) => {
    dispatch(selectPage(page))
    setDragging(true);
    setInitialPosition({ x: event.clientX, y: event.clientY });
    setDraggedElement(page);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setInitialPosition({ x: 0, y: 0 });
    setDraggedElement(null);
  };

  const handleDrag = (event, page) => {
    if (!dragging) {
      return
    }

    const dx = event.clientX - initialPosition.x;
    const dy = event.clientY - initialPosition.y;

    dispatch(setProps({positionX: draggedElement.positionX + dx, positionY: draggedElement.positionY + dy}))

    setInitialPosition({ x: event.clientX, y: event.clientY });
  };


  useEffect(() => {
    const handleMouseMove = (event) => {
      handleDrag(event);
    };

    const handleTouchMove = (event) => {
      if (event.touches.length === 1) {
        handleDrag(event.touches[0]);
      }
    };

    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [dragging, draggedElement]);

  return (
    <CanvasWrapper>
      {
        elements.map(
          (page, index) => (
            selectedPage.id === page.parentPageId ? <Block
              data-testid={`block-${index}`}
              key={index}
              x={page.positionX}
              y={page.positionY}
              o={page.opacity / 100}
              color={page.color}
              active={page.isSelected}
              onClick={() => dispatch(selectPage(page))}
              draggable={!dragging}
              onMouseDown={(event) => handleDragStart(event, page)}
              onMouseUp={handleDragEnd}
              onTouchStart={(event) => handleDragStart(event.touches[0], page)}
              onTouchEnd={handleDragEnd}
            /> : ''
          )
        )
      }
    </CanvasWrapper>
  );
};

export default Canvas;
