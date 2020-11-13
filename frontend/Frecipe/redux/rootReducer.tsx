import { combineReducers } from 'redux';
import refrigeratorReducer from './refrigeratorSlice';
import usersReducer from './usersSlice';
import communityReducer from './communitySlice';

const rootReducer = combineReducers({
  refrigerator: refrigeratorReducer,
  usersReducer: usersReducer,
  community: communityReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
