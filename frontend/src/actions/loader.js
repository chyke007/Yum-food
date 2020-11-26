import { SET_LOADER,SET_PAGINATION,SET_PAGE_STATE } from "../types";

export const setLoader = (status) => ({
  type: SET_LOADER,
  payload: status,
});
export const setPagination = (paginate) => ({
  type: SET_PAGINATION,
  payload: paginate,
});

export const setPageState = (state) => ({
  type: SET_PAGE_STATE,
  payload: state
})
