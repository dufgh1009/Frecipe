import { combineReducers } from 'redux';
import refrigeratorReducer from './refrigeratorSlice';
import usersReducer from './usersSlice';
import communityReducer from './communitySlice';
import createRecipe from './createRecipeSlice';
import cameraReducer from './cameraSlice';

const rootReducer = combineReducers({
  cameraReducer: cameraReducer,
  refrigerator: refrigeratorReducer,
  usersReducer: usersReducer,
  community: communityReducer,
  createRecipe: createRecipe,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
