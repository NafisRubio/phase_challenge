import {createSlice, current} from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'pages',
  initialState: {
    value: [
      {
        name: 'Page 1',
        index: 0,
        isSelected: true,
        id: 'AB'
      },
      {
        name: 'Page 2',
        index: 1,
        isSelected: false,
        id: 'CD'
      }
    ],
  },
  reducers: {
    deSelectAllPages: (state) => {
      state.value.forEach(page => {
        page.isSelected = false;
      })
    },
    selectPage: (state, action) => {
      state.value.forEach(page => {
        page.isSelected = page.index === action.payload.index;
      })
    },
    addPage(state, action) {
      state.value.push(action.payload);
    },
    removePage(state, action) {
      state.value.splice(action.payload, 1);
    },
    getSelectedPage(state){
      state.value.find(page => page.isSelected)
      return current(state)
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
  getSelectedPage,
  setProps
} = counterSlice.actions
export default counterSlice.reducer
export const selectedPageSelector = (state) => state.pages.value.find(page => page.isSelected)
