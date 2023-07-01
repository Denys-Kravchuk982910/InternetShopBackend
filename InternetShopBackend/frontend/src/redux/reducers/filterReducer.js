import { createSlice } from "@reduxjs/toolkit";


const initialState = [];

const filterSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
      addFilter(state, action) {
        return [...state, action.payload]; 
      },
      removeFilter(state, action) {
        let found = state.find(element => element == action.payload);
        let newArr = state.filter(function(e) { return e != found });

        return newArr;
      }
    }
  })

export const { addFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;