// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import authReducer from "./slice/authSlide";

// const rootReducer = combineReducers(
//     { auth: authReducer, }
// );
// const store = configureStore({
//     reducer: rootReducer,

// })

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlide';

const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;