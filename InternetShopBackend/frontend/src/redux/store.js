import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productReducer from "./reducers/productReducer";
import pageReducer from "./reducers/pageReducer";
import filterReducer from "./reducers/filterReducer";
import cartReducer from "./reducers/cartReducer";
import feedbackReducer from "./reducers/feedbackReducer";


const middleware = [thunk];


export const store = configureStore({
    reducer: {
        products: productReducer,
        page: pageReducer,
        filter: filterReducer,
        cart: cartReducer,
        feedback: feedbackReducer
    },
    middleware: middleware,
    devTools: process.env.NODE_ENV !== 'production' ? composeWithDevTools() : false
});