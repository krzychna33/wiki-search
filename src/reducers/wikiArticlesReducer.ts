import {
    SEARCH_WIKI_ARTICLES_ERROR,
    SEARCH_WIKI_ARTICLES_FETCH,
    SEARCH_WIKI_ARTICLES_SUCCESS
} from "../actions/actions.consts";

export interface IWikiArticlesReducer {
    results: any;
    isLoading: boolean;
}

const wikiArticlesReducerDefaultState: IWikiArticlesReducer = {
    results: [],
    isLoading: false
}

export default (state: IWikiArticlesReducer = wikiArticlesReducerDefaultState, action: any) => {
    switch (action.type) {
        case SEARCH_WIKI_ARTICLES_SUCCESS:
            return {
                ...state,
                results: action.data.results,
                isLoading: false
            }
        case SEARCH_WIKI_ARTICLES_ERROR:
            return  {
                ...state,
                isLoading: false
            }
        case SEARCH_WIKI_ARTICLES_FETCH: {
            return {
                ...state,
                isLoading: true
            }
        }
        default:
            return state;
    }
}