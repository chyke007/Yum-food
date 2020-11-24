import { actions } from 'react-redux-toastr'

export function showMessage(title, message, options){
  return dispatch => dispatch(actions.add({
    type: options.status,
    title,
    message,
    options
 }))
}