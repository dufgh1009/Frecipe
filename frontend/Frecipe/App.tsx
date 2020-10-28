import React from 'react';
import { StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor } from './redux/store';

import Gate from './screens/Gate';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import ReduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Gate />
      </PersistGate>
    </Provider >
  );
}
