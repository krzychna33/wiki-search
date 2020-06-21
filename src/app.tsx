import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.scss";
import WikiSearch from "./screens/WikiSearch";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";

const store = configureStore();

ReactDOM.render(
    <div>
        <Provider store={store}>
            <WikiSearch/>
        </Provider>
    </div>,
    document.getElementById("app"),
);