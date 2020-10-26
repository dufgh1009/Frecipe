import { combineReducers } from 'redux';
import refrigeratorReducer from './refrigeratorSlice';

const rootReducer = combineReducers({
  refrigerator: refrigeratorReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;