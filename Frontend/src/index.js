import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/index';
import { setCurrentUser } from './store/slice/authSlice';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3030/graphql',
  cache: new InMemoryCache()
});

const token = localStorage.getItem('token')
if(token) {
  store.dispatch(setCurrentUser(token))
}


ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
