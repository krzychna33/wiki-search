import {
    SEARCH_WIKI_ARTICLES_ERROR,
    SEARCH_WIKI_ARTICLES_FETCH,
    SEARCH_WIKI_ARTICLES_SUCCESS
} from "./actions.consts";
import {searchWikiArticles} from "../api/wikiArticles";

export const searchWikiArticlesFetch = () => ({
    type: SEARCH_WIKI_ARTICLES_FETCH
});

export const searchWikiArticlesError = () => ({
    type: SEARCH_WIKI_ARTICLES_ERROR
});

export const searchWikiArticlesSuccess = (results: any) => ({
    type: SEARCH_WIKI_ARTICLES_SUCCESS,
    data: {
        results
    }
});

export const startSearchWikiArticles = (searchPhrase: string) => {
    return (dispatch: any) => {
        dispatch(searchWikiArticlesFetch());
        searchWikiArticles(searchPhrase).then((response) => {
            dispatch(searchWikiArticlesSuccess(response.data.query.search));
        }).catch((err) => {
            dispatch(searchWikiArticlesError());
        })
    }
}

