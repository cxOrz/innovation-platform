import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/Router';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/idea.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
