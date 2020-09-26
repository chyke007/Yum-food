import { ADD, SUBTRACT } from "../constants"

const mathReducer = (
    state = {
        result: 1,
        lastValues: [],
    },
    action
) => {
    switch (action.type) {
        case ADD:
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload],
            };
            break;
        case SUBTRACT:
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload],
            };
            break;
            default:
                state = {
                    ...state
                };
    }
    return state;
};

export default mathReducer;