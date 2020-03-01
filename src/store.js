import { createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const composeEnhance = window._REDUX_DEVTOOLS_EXTENTION_OMPOSE_ || compose;
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
export default store;