import { createSlice } from "@reduxjs/toolkit";


var initialState = [];

const cartSlice = createSlice({
    name: "cart", 
    initialState,
    reducers: {
        addToCart(state, action) {
            let arr = [...state, {...action.payload, id: state.length, number: 1}];
            localStorage.setItem('cart', 
                JSON.stringify( arr)
            );
            return arr;
        },
        changeCount(state, action) {
            let newArr = [];

            for (let item of state) {
                if (item.id === action.payload.id) {
                    newArr.push({...item, number: item.number + action.payload.count});
                }else {
                    newArr.push(item);
                } 
            }

            return newArr;
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
        },
        clearFilters(state, action) {
            return [];
        }
    }
});


export const {addToCart, removeFromCart, changeSize, clearFilters, changeCount} = cartSlice.actions;
export default cartSlice.reducer;