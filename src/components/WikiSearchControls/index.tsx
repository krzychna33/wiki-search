import * as React from "react";
import * as style from "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {setReplaceWithPhrase, setSearchPhrase} from "../../actions/filters";
import {IStoreInterface} from "../../store/configureStore";

interface IWikiSearchControlsProps {
    searchTrigger(): any;
    replaceTrigger(): any;
    replaceAllTrigger(): any;
}

const WikiSearchControls: React.FC<IWikiSearchControlsProps> = (props: IWikiSearchControlsProps) => {
    const dispatch = useDispatch();
    const searchPhrase = useSelector((store: IStoreInterface) => store.filtersReducer.searchPhrase)
    const replaceWithPhrase = useSelector((store: IStoreInterface) => store.filtersReducer.replaceWithPhrase)
    return (
        <div className={style.container}>
            <div className={style.inputsGroup}>
                <div className={style.formElement}>
                    <label>Search phrase</label>
                    <input
                        type="string"
                        value={searchPhrase}
                        onChange={e => dispatch(setSearchPhrase(e.target.value))}
                    />
                </div>
                <div className={style.formElement}>
                    <label>Replace with</label>
                    <input
                        type="string"
                        value={replaceWithPhrase}
                        onChange={e => dispatch(setReplaceWithPhrase(e.target.value))}
                    />
                </div>
            </div>
            <div className={style.buttonsGroup}>
                <button onClick={props.searchTrigger}>Search</button>
                <button onClick={props.replaceTrigger}>Replace</button>
                <button onClick={props.replaceAllTrigger}>Replace All</button>
            </div>
        </div>
    )
}

export default WikiSearchControls;