import { combineReducers } from "redux";
import user from "./userReducer";
import attractions from "./attractionsReducer";
import attractionsSearch from "./attractionsSearchReducer";

export default combineReducers({
  user,
  attractions,
  attractionsSearchResults: attractionsSearch,
});
