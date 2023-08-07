// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     isLoggedIn: false,
//     email: null,
//     userName: null,
//     userID: null,
// }

// const authSlide = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         SET_ACTIVE_USER(state, action) {
//             // console.log(action.payload)
//             const { email, userName, userID } = action.payload;
//             state.isLoggedIn = true;
//             state.email = email;
//             state.userName = userName;
//             state.userID = userID;
//         }
//     }
// })

// export const { SET_ACTIVE_USER } = authSlide.actions;

// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
// export const selectEmail = (state) => state.auth.email;
// export const selectUserName = (state) => state.auth.userName;
// export const selectUserID = (state) => state.auth.userID;


// export default authSlide.reducer



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.value = action.payload
        }
    }
});

export const { setAuth } = authSlide.actions;

export default authSlide.reducer;

