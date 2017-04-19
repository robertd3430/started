var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import MovieListTableRow from './MovieListTableRow.jsx';

var MovieListTableBody = withRouter (
  React.createClass({

    //
    // EVENT LIFECYCLE
    //

    getInitialState: function() {
      console.log("TABLE BODY GET INITIAL STATE");
      return {
        movies: []
      };
    },

    componentWillMount: function(){
      console.log("TABLE BODY WILL MOUNT");
    },

    componentDidMount: function(){
      console.log("TABLE BODY DID MOUNT");
      this.determinePageTitle(this.props.params);
      this.determineMovies(this.props.params);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("TABLE BODY WILL RECEIVE PROPS");
      this.determinePageTitle(nextProps.params);
      this.determineMovies(nextProps.params);
    },

    componentWillUpdate: function(nextProps, nextState) {
      console.log("TABLE BODY WILL UPDATE");
    },

    //
    // PAGE TITLE FUNCTIONS
    //

    determinePageTitle: function(paramz){
      console.log("DETERMINING PAGE TITLE BASED ON PARAMS", paramz);
      if(paramz.id){
        this.props.setPageTitle("Movie #"+paramz.name);
      } else {
        this.props.setPageTitle("Movie");
      };
    },

    //
    // FLASH FUNCTIONS
    //

    determineMovies: function(paramz){
      console.log("DETERMINING MOVIE BASED ON PARAMS", paramz, this.state.movies);
      if(paramz.id){
        this.setMovie(paramz.id);
      } else {
        this.setMovies();
      };
    },

    setMovie: function(movieId){
      var requestUrl = '/api/movies/'+movieId;
      console.log("AJAX REQUEST", requestUrl);
      $.ajax({
        url: requestUrl,
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log("REQUEST SUCCESS", data);
          this.setState({robots: [data]});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("REQUEST ERROR", xhr, status, err);
          this.props.router.push({
            pathname: '/',
            state: {
              movies: [],
              flash: {danger: ["Couldn't find movie #"+robotId]}
            }
          });
        }.bind(this)
      });
    },

    setMovies: function(){
      var requestUrl = '/api/movies';
      console.log("AJAX REQUEST", requestUrl);
      $.ajax({
        url: requestUrl,
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log("REQUEST SUCCESS", data);
          this.setState({movies: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("REQUEST ERROR", xhr, status, err);
          this.props.router.push({
            pathname: '/',
            state: {
              movies: [],
              flash: {danger: ["Couldn't find any movies"]}
            }
          });
        }.bind(this)
      });
    },

    render: function(){
      return (
          <tbody>
          {
              this.state.movies.map( function(movie){
                  return (
                      <MovieListTableRow key={movie._id} movie={movie}/>
                  );
              })
          }
          </tbody>
      )
    }
  })
);

module.exports = MovieListTableBody;
