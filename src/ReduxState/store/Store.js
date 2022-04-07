import { rootReducer } from "../rootreducers/RootReducer";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootSagas from "../sagas/UserSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddlewares = createSagaMiddleware();
const middlewares = [sagaMiddlewares];

if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddlewares.run(rootSagas);

export default store;