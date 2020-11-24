import { combineReducers } from "redux";
import user, * as fromAuth from "./user";
import loading from "./loader";
import auth from "./auth"
import toastr from "./toastr"

const reducer = combineReducers({  user, loading, auth,toastr });

export const selectUserName = (state) => fromAuth.selectUserName(state.user);
export default reducer;