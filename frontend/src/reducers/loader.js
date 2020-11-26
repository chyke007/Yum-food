import { SET_LOADER,SET_PAGINATION,SET_PAGE_STATE } from "../types";

const initialState = {status: false, pagination:{},pageState:false};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADER:
      return { ...initialState,status: payload };
    case SET_PAGINATION:
      return  { ...initialState,pagination: payload };
      case SET_PAGE_STATE:
        return  { ...initialState,pageState: payload };
    default:
      return state;
  }
}