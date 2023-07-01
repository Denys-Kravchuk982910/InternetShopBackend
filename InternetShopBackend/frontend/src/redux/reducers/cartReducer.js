import { createSlice } from "@reduxjs/toolkit";


var initialState = [];

const cartSlice = createSlice({
    name: "cart", 
    initialState,
    reducers: {
        addToCart(state, action) {
            if(state.filter(x => x.id === action.payload.id).length == 1) {
                return state;
            }
            return [...state, action.payload];
        },
        removeFromCart(state, action) {
            let newArr = state.filter(x => x.id !== action.payload);
            return newArr;
        },
        changeSize(state, action) {
            let updated = state.map(item => {
                if(item.id == action.payload.id) {
                    return {
                        ...item,
                        size: action.payload.size
                    }
                }
                return item;
            });
            return [...updated];
        }
    }
});


export const {addToCart, removeFromCart, changeSize} = cartSlice.actions;
export default cartSlice.reducer;