import { combineReducers } from "redux";
import user, * as fromAuth from "./user";
import math from "./math";

const reducer = combineReducers({ math, user });

export const selectUserName = (state) => fromAuth.selectUserName(state.user);
export default reducer;