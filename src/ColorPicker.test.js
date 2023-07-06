import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
  test('renders ColorPicker component', () => {
    const {getByTestId} = render(<ColorPicker color="#FF0000"/>);
    const colorPicker = getByTestId('color-picker');
    expect(colorPicker).toBeInTheDocument();
  });

  test('changes color on input', () => {
    const onInput = jest.fn()
    const {getByTestId} = render(<ColorPicker color="#FF0000" onInput={onInput}/>);
    const colorPicker = getByTestId('color-picker');
    fireEvent.input(colorPicker, {target: {value: '#00FF00'}});
    expect(onInput).toHaveBeenCalledTimes(1)
    expect(onInput).toHaveBeenCalledWith(expect.any(Object));
  });
});
