import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import ReduxThunk from 'redux-thunk';
import filtersReducer, {IFiltersReducer} from "../reducers/filtersReducer";
import wikiArticlesReducer, {IWikiArticlesReducer} from "../reducers/wikiArticlesReducer";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IStoreInterface {
    filtersReducer: IFiltersReducer,
    wikiArticlesReducer: IWikiArticlesReducer
}

export default () => {
    const store = createStore(
        combineReducers({
            filtersReducer,
            wikiArticlesReducer
        }),
        composeEnhancers(applyMiddleware(ReduxThunk))
    );

    return store;
}