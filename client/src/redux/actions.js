import { FETCH_USER_BEGIN, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./actionTypes";

export const fetchUserBegin = () => (
    {
        type: FETCH_USER_BEGIN
    }
)
export const fetchUserSuccess = (user) => (
    {
        type: FETCH_USER_SUCCESS,
        payload: { user }
    }
)
export const fetchUserFailure = (error) => (
    {
        type: FETCH_USER_BEGIN,
        payload: { error }
    }
)