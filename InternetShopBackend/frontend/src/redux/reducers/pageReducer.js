import { createSlice } from "@reduxjs/toolkit";


const initialState = 1;

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
      increment(state, action) {
        return state + 1; 
      },
      setNullItem(state, action) {
        return 1;
      }
    }
  })

export const { increment, setNullItem  } = pageSlice.actions;
export default pageSlice.reducer;