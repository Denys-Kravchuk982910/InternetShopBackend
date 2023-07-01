import { createSlice } from "@reduxjs/toolkit";


const initialState = []

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      setProducts(state, action) {
            return action.payload.payload;
      },
      todoToggled(state, action) {
        return action.payload;
      }
    }
  })

export const { setProducts, todoToggled } = productSlice.actions;
export default productSlice.reducer;