import { render } from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import App from "./containers/App";
import store from "./store";
import ReduxToastr from 'react-redux-toastr'
import './assets/styles.css';
render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
      <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      getState={(state) => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
     </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
