import {
    applyMiddleware,
    legacy_createStore as createStore,
} from "redux";

import createSagaMiddleware from "redux-saga";

import attachApiServiceMiddleware from "./middleware/attachApiServiceMiddleware";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(attachApiServiceMiddleware, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;