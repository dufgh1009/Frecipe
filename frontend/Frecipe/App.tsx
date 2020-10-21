import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import Main from "./navigation/Main";
// import rootReducer from "./redux";


// const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    // <Provider store={store}>
    //   <Main />
    // </Provider>
    <Main></Main>
  );
};

export default App;