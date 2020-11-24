import { createStore, applyMiddleware, compose } from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/";
const store = createStore(
    reducers, {},
    compose(
        applyMiddleware(createLogger(), thunk),
        devToolsEnhancer({
            name: "Basic setup",
            realtime: false,
        })
    )
);

export default store;