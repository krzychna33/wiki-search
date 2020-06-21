import {SET_REPLACE_WITH_PHRASE, SET_SEARCH_PHRASE} from "../actions/actions.consts";

export interface IFiltersReducer {
    searchPhrase: string,
    replaceWithPhrase: string
}

const FiltersReducerDefaultState: IFiltersReducer = {
    searchPhrase: "",
    replaceWithPhrase: ""
}

export default (state: IFiltersReducer = FiltersReducerDefaultState, action: any) => {
    switch (action.type) {
        case SET_SEARCH_PHRASE:
            return {
                ...state,
                searchPhrase: action.data.searchPhrase
            }
        case SET_REPLACE_WITH_PHRASE:
            return {
                ...state,
                replaceWithPhrase: action.data.replaceWithPhrase
            }
        default:
            return state;
    }
}