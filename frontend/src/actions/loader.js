import { SET_LOADER } from "../constants";

export const setLoader = (status) => ({
  type: SET_LOADER,
  payload: status,
});
