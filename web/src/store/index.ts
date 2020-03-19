import {applyMiddleware, combineReducers, compose, createStore, Store} from "redux";
import {AnalysisState} from "./analysis/types";
import {analysisReducer} from "./analysis/reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    analysis: analysisReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        compose(middleWareEnhancer)
    );

    return store;
}
