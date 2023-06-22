import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const INITIAL_STATE = {
    user: null,
    authToken: null,
    count: 0
}

// let history = useNavigate()

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        change: (state)=> {
            state.count = 1;
            
        },
        loginUser: async (state, action) => {
            
            
        },
        updateAuthToken:(state,action)=>{
            state.authToken = action.payload;
        },
        updateUser:(state,action)=>{
            state.user = action.payload;
        }
    }
})

export const { loginUser, change,updateAuthToken,updateUser } = authSlice.actions

export default authSlice.reducer