require("../node_modules/bootstrap/dist/css/bootstrap.css");
require("../public/stylesheets/style.css");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Redirect } from 'react-router';

import App from './components/App.jsx';
import MovieListTable from './components/MovieListTable.jsx';
import MoviesForm from './components/MoviesForm.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MovieListTable}/>
      <Route path="movies" component={MovieListTable}/>
      <Route path="movies/new" component={MoviesForm}/>
      <Route path="movies/:id" component={MovieListTable}/>
      <Route path="movies/:id/edit" component={MoviesForm}/>
    </Route>
  </Router>

  ,document.getElementById('app')
);

if (module.hot) {module.hot.accept();}