import { combineReducers } from 'redux';
import refrigeratorReducer from './refrigeratorSlice';
import usersReducer from './usersSlice';


const rootReducer = combineReducers({
  refrigerator: refrigeratorReducer,
  users: usersReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
