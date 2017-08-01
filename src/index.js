import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  Provider
} from "react-redux";
import {
  createStore
} from "redux";
import contentGenerator from "./components/ContentGenerator";

function contentTable(state = contentGenerator(30), action) {
 
  if (action.type === "ADD_CONTENT") {
    return [
      ...state.concat(contentGenerator(30))
    ];
  }
  return state;
}

const STORE = createStore(contentTable);


ReactDOM.render(
  <Provider store={STORE}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();