import { combineReducers } from "redux";
import firmOpen from "./firmOpen";
import getText from "./getText";
import handleTip from "./handleTip";
import tipHtml from "./tipHtml";


export default combineReducers({
    firmOpen, getText, handleTip, tipHtml
})