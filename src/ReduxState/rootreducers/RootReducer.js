import { combineReducers } from "redux";
import {userReducer} from "../reducers/reducer";

export const rootReducer = combineReducers({
    userData: userReducer
})