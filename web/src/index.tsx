import * as React from 'react'
import { Provider } from 'react-redux'
import {render} from "react-dom";
import RootContainer from "./components/root";
import configureStore from "./store";

const store = configureStore()

render(
    <Provider store={store}>
        <RootContainer/>
    </Provider>,
    document.getElementById('root')
);