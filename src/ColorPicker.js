import React, {useRef, useEffect} from "react";
import styled from "styled-components";

const ColorPickerWrapper = styled.div`
  width: 16px;
  height: 16px;
  align-self: center;
  overflow: hidden;
`;
const ColorInput = styled.input`
  opacity: 0;
  display: block;
  width: 32px;
  height: 32px;
  border: none;
`;
ColorInput.defaultProps = {
  type: "color"
};
const ColorPicker = (
  {
    color,
    onInput
  }
) => {
  const ref = useRef();
  const inputRef = useRef();
  useEffect(() => {
    ref.current.style.background = color
  }, [color]);
  return (
    <ColorPickerWrapper ref={ref}>
      <ColorInput
        data-testid='color-picker'
        value={color}
        ref={inputRef}
        onInput={onInput}
      />
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
