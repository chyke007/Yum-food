import { SET_LOADER } from "../constants";

const initialState = {status: false};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADER:
      return { status: payload };

    default:
      return state;
  }
}