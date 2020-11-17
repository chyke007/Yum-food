import { SET_NAME, SET_AGE } from "../constants";

const userReducer = (
    state = {
        name: "Max",
        age: 26,
        token: null
    },
    action
) => {
    switch (action.type) {
        case SET_NAME:
            state = {
                ...state,
                name: action.payload,
            };
            break;
        case SET_AGE:
            state = {
                ...state,
                age: action.payload,
            };
            break;
            default:
                state = {
                    ...state
                    
                };
    }
    return state;
};

//Selectors
export const selectUserName = (state) => {
    return state.name.toUpperCase();
};

export default userReducer;