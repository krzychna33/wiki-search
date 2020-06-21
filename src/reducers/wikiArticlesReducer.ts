import {SEARCH_WIKI_ARTICLES_SUCCESS} from "../actions/actions.consts";

export interface IWikiArticlesReducer {
    results: any
}

const wikiArticlesReducerDefaultState: IWikiArticlesReducer = {
    results: []
}

export default (state: IWikiArticlesReducer = wikiArticlesReducerDefaultState, action: any) => {
    switch (action.type) {
        case SEARCH_WIKI_ARTICLES_SUCCESS:
            return {
                ...state,
                results: action.data.results
            }
        default:
            return state;
    }
}