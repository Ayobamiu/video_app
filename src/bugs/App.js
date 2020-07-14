import React, { Component } from "react";
import Bugs from "./bugs";
import configureStore from "../store/configureStore";
import { Provider } from "react-redux";
import BugsList from './bugsList';

const store = configureStore();

class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <BugsList />
      </Provider>
    );
  }
}

export default App;
