import React from 'react';
import Gate from './screens/Gate';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import ReduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <Gate />
    </Provider>);
}
