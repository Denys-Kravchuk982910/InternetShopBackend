import { createSlice } from "@reduxjs/toolkit";


var initialState = [];

const feedbackSlice = createSlice({
    name: "feedback", 
    initialState,
    reducers: {
        setFeedback(state, action) {
            return action.payload;
        },
        addFeedback(state, action) {
            return [...state, action.payload];
        },
        updateFeedback(state, action) {
            let updated = state.map(item => {
                if(item.email == action.payload.email) {
                    return {
                        ...item,
                        message: action.payload.message,
                        time: action.payload.time
                    }
                }
                return item;
            });

            return [...updated]
        },
        clearFeedbacks(state, action) {
            return [];
        }
    }
});


export const {clearFilters, setFeedback, addFeedback, updateFeedback} = feedbackSlice.actions;
export default feedbackSlice.reducer;