import { useReducer } from "react";
import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./actionTypes";

const initialState = {
    loading: false,
    user: [],
    error: null
}

 const userReducer = (state = initialState, action ) => {

    switch(action.type) {
        case FETCH_USER_BEGIN:
            return{
                ...state,
                loading: true
            }

        case FETCH_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                user: action.payload.user
            }

        case FETCH_USER_FAILURE:
            return{
                ...state,
                loading: false, 
                error: action.payload.error
            }

        default:    
            return state
    }
}

export default userReducer