import { fetchUserBegin, fetchUserSuccess, fetchUserFailure } from "./actions";
import axios from "axios";
export const fetchUsers = () => async (dispatch) => {
    dispatch(fetchUserBegin());
    try {
        const response = await axios.get("http://localhost:3000/api/v1/user", { withCredentials: true });
        const user = response.data.user;
        console.log("user: ", user);
        
        dispatch(fetchUserSuccess(user));
    } catch (error) {
        // Sanitize error for Redux
        const serializableError = {
            message: error.message,
            code: error.code,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : null,
        };
        dispatch(fetchUserFailure(error));
    }
}