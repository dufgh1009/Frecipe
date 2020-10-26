import { combineReducers } from 'redux';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
  usersReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
