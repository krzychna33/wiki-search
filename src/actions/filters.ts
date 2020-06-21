import {SET_REPLACE_WITH_PHRASE, SET_SEARCH_PHRASE} from "./actions.consts";

export const setSearchPhrase = (searchPhrase: string = "") => ({
    type: SET_SEARCH_PHRASE,
    data: {
        searchPhrase
    }
});

export const setReplaceWithPhrase = (replaceWithPhrase: string = "") => ({
    type: SET_REPLACE_WITH_PHRASE,
    data: {
        replaceWithPhrase
    }
});