import { SET_LOADER } from "../types";

export const setLoader = (status) => ({
  type: SET_LOADER,
  payload: status,
});
