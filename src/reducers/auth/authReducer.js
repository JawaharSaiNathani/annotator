import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "../../actions/authAction";

const token = sessionStorage.getItem('token');
const initialState = {
    token: token,
    isAuthenticated: !token ? false : true,
    rememberme: false,
    message: null
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            if (action.payload.rememberme)
                localStorage.setItem("token", payload.token);
            sessionStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true
            };
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                message: action.payload.message
            };
        case REGISTER_SUCCESS:
            sessionStorage.setItem("token", payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true
            };
        case REGISTER_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        case LOGOUT:
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}