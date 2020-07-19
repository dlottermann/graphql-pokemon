import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import { Provider } from 'react-redux';
import store from './store'

import { ApolloProvider } from '@apollo/client';
import { client } from './services'
import { Detail, FormEdt } from './components';




ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route exact path="/:id">
              <Detail />
            </Route>
            <Route exact path="/edt/:id">
              <FormEdt />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

