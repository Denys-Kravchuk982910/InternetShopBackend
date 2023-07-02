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
            let arr = [...state, action.payload];
            localStorage.setItem('cart', 
                JSON.stringify( arr)
            );
            return arr;
        },
        removeFromCart(state, action) {
            let newArr = state.filter(x => x.id !== action.payload);
            localStorage.setItem('cart', 
                JSON.stringify( newArr)
            );
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

            localStorage.setItem('cart', 
                JSON.stringify( [...updated])
            );
            return [...updated];
        }
    }
});


export const {addToCart, removeFromCart, changeSize} = cartSlice.actions;
export default cartSlice.reducer;