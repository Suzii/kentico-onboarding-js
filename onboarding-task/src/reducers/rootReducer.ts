import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { itemIdsReducer } from './itemIdsReducer';
import { fetchingFlagReducer } from './fetchingFlagReducer';
import { errorReducer } from './errorReducer';
import { postingFlagReducer } from './postingFlagReducer';
import { errorIdsReducer } from './errorIdsReducer';

const rootReducer = combineReducers({
  items: itemsReducer,
  itemIds: itemIdsReducer,
  isFetching: fetchingFlagReducer,
  isPosting: postingFlagReducer,
  errors: errorReducer,
  errorIds: errorIdsReducer,
});

export { rootReducer };
