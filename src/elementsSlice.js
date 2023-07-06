import {createSlice} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'elements', initialState: {
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
      },
      {
        id: 'A2',
        name: 'Element 2',
        index: 1,
        isSelected: false,
        parentPageId: 'AB',
        positionX: 60,
        positionY: 60,
        opacity: 100,
        color: '#ff00d5',
      },
      {
        id: 'A3',
        name: 'Element 3',
        index: 2,
        isSelected: false,
        parentPageId: 'AB',
        positionX: 110,
        positionY: 110,
        opacity: 100,
        color: '#00FF00',
      }
    ],
  },
  reducers: {
    selectPage: (state, action) => {
      state.value.forEach(page => {
        page.isSelected = page.index === action.payload.index;
      })
    },
    setProps: (state, action) => {
      state.value.forEach(page => {
        if (!page.isSelected) {
          return
        }
        for (let x in action.payload) {
          page[x] = action.payload[x];
        }
        return page;
      })
    }
  }
})
export const {
  selectPage,
  addPage,
  removePage,
  deSelectAllPages,
  setProps,
} = counterSlice.actions
export default counterSlice.reducer
