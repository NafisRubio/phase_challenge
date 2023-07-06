import {configureStore} from '@reduxjs/toolkit'
import pagesReducer from './pagesSlice'
import elementsReducer from './elementsSlice'

export default configureStore({
  reducer: {
    pages: pagesReducer,
    elements: elementsReducer,
  },
})