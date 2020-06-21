import * as React from "react";
import * as style from "./style.scss"
import WikiSearchControls from "../../components/WikiSearchControls";
import {connect} from "react-redux";
import {IStoreInterface} from "../../store/configureStore";
import {IFiltersReducer} from "../../reducers/filtersReducer";
import {startSearchWikiArticles} from "../../actions/wikiArticles";
import {IWikiArticlesReducer} from "../../reducers/wikiArticlesReducer";
import "./searchMatchStyles.css";

interface IWikiSearchProps {
    filters: IFiltersReducer;
    startSearchWikiArticles(searchPhrase: string): any;
    wikiArticles: IWikiArticlesReducer;
}

interface IWikiSearchState {
    results: any[]
}

class WikiSearch extends React.Component<IWikiSearchProps, IWikiSearchState> {

    private searchTimeout = undefined as any;

    constructor(props: any) {
        super(props);
        this.state = {
            results: []
        }
    }

    searchTrigger = () => {
        const {searchPhrase} = this.props.filters;
        this.props.startSearchWikiArticles(searchPhrase);
    }

    componentDidUpdate(prevProps: Readonly<IWikiSearchProps>, prevState: Readonly<IWikiSearchState>, snapshot?: any): void {
        if (prevProps.filters.searchPhrase != this.props.filters.searchPhrase) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.searchTrigger()
            }, 1000)
        }

        if (JSON.stringify(prevProps.wikiArticles.results) != JSON.stringify(this.props.wikiArticles.results)) {
            this.setState({
                results: this.props.wikiArticles.results
            })
        }
    }

    replacePhrase = () => {
        const {searchPhrase, replaceWithPhrase} = this.props.filters;

        let alreadyChanged = false;
        const replacerRegex = new RegExp(searchPhrase, "i")
        this.setState({
            results: this.state.results.map((article) => {
                if (article.snippet.search(replacerRegex) != -1 && !alreadyChanged) {
                    alreadyChanged = true;
                    return {
                        ...article,
                        snippet: article.snippet.replace(replacerRegex, replaceWithPhrase)
                    }
                } else {
                    return article;
                }
            })
        })
    }

    replaceAll = () => {
        const {searchPhrase, replaceWithPhrase} = this.props.filters;
        const replacerRegex = new RegExp(searchPhrase, "gi")
        this.setState({
            results: this.state.results.map((article) => {
                return {
                    ...article,
                    snippet: article.snippet.replace(replacerRegex, replaceWithPhrase)
                }
            })
        })
    }

    render() {
        const {searchPhrase} = this.props.filters;
        return (
            <div>
                <div className={style.header}>
                    <h1>Wiki search</h1>
                </div>
                <WikiSearchControls searchTrigger={this.searchTrigger} replaceTrigger={this.replacePhrase}
                                    replaceAllTrigger={this.replaceAll}/>
                <div className={style.resultsWrapper}>
                    {
                        this.props.wikiArticles.isLoading ?
                            <div>
                                <p>Loading...</p>
                            </div>
                        :
                            <div>
                                <h3>Search results</h3>
                                {
                                    this.state.results && this.state.results.map((article: any) => {
                                        return (
                                            <div className={style.article}>
                                                <h4>{article.title}</h4>
                                                <div dangerouslySetInnerHTML={{__html: article.snippet}}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IStoreInterface) => {
    return {
        filters: state.filtersReducer,
        wikiArticles: state.wikiArticlesReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        startSearchWikiArticles: (searchPhrase: string) => dispatch(startSearchWikiArticles(searchPhrase))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiSearch)