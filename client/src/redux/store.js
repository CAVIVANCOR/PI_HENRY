import thunk from "redux-thunk";
import rootReducer from "./reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
const {createStore, applyMiddleware}=require("redux");

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
