import { createStore, applyMiddleware, compose } from "redux";
import {persistReducer, persistStore} from "redux-persist";
import devToolsEnhancer from "remote-redux-devtools";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/";
import { persistConfig} from "./configureStore"
const persisted = persistReducer(persistConfig, reducers);


export const store = createStore(
    persisted, {},
    compose(
        applyMiddleware(createLogger(), thunk),
        devToolsEnhancer({
            name: "Basic setup",
            realtime: false,
        })
    )
);
export const persistor = persistStore(store)