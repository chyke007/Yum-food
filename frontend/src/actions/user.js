import { SET_NAME, SET_AGE } from "../constants";

export function setName(name) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: SET_NAME,
                payload: name,
            });
            console.log(true);
        }, 2000);
    };
}

export function setAge(age) {
    return {
        type: SET_AGE,
        payload: age,
    };
}