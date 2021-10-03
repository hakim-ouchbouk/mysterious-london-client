import { combineReducers } from "redux";
import user from "./userReducer";
import attractions from "./attractionsReducer";
import attractionsSearch from "./attractionsSearchReducer";
import addresses from "./addressesReducer";
import AttractionCountReducer from "./AttractionCountReducer";
import flashMessageReducer from "./flashMessageReducer";

export default combineReducers({
  user,
  attractions,
  attractionsSearchResults: attractionsSearch,
  addresses,
  attractionsCount: AttractionCountReducer,
  flashMessage: flashMessageReducer,
});
