var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import {movieUrl, createMovieUrl} from '../../helpers/api'
import {postRequestOptions, checkStatus, parseJSON, parseError} from '../../helpers/fetch';
import MoviesFormInputName from './MoviesFormInput.jsx';
import MoviesFormDeleteButton from './MoviesFormDeleteButton.jsx';
import MoviesFormSubmitButton from './MoviesFormSubmitButton.jsx';

var MoviesForm = withRouter (
  React.createClass({

    defaultBot: {name:"", description:""},

    //
    // EVENT LIFECYCLE
    //

    getInitialState: function() {
      console.log("FORM GET INITIAL STATE");
      return {
        bot: this.defaultBot,
        formAction: this.formAction(this.props)
      };
    },

    componentWillMount: function(){
      console.log("FORM WILL MOUNT", this.state.bot);
    },

    componentDidMount: function(){
      console.log("FORM DID MOUNT", this.state.bot);
      this.determinePageTitle(this.props.params);
      this.determineMovie(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM WILL RECEIVE PROPS");
      this.determinePageTitle(nextProps.params);
      this.determineMovie(nextProps);
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM WILL UPDATE", nextState.bot);
    },

    determinePageTitle: function(paramz){
      console.log("DETERMINING PAGE TITLE BASED ON PARAMS", paramz);
      if(paramz.id){
        this.props.setPageTitle("Edit Movie");
      } else {
        this.props.setPageTitle("New Movie");
      };
    },

    formAction: function(propz){
      console.log("FORM DETERMINING ACTION BASED ON PROPS", propz);
      var formAction = (propz.params && propz.params.id) ? "UPDATE_ROBOT" : "CREATE_ROBOT";
      return formAction;
    },

    determineMovie: function(propz){
      console.log("FORM DETERMINING MOVIE BASED ON PROPS", propz);
      if(propz.location && propz.location.state && propz.location.state.formBot){
        // PREVIOUS FORM VALUES (NEW / EDIT)
        // test this by changing form values to be blank such that they trigger a validation error from the api
        this.setState({bot: propz.location.state.formBot});
      } else if (propz.location && propz.location.state && propz.location.state.showBot) {
        // PREVIOUS SHOW PAGE VALUES (EDIT)
        // test this by clicking on an "edit" button
        this.setState({bot: propz.location.state.showBot});
      } else if (propz.params && propz.params.id) {
        // DATABASE VALUES (EDIT)
        // test this by visiting: http://localhost:3000/#/robots/abc/edit
        this.getMovie(propz.params.id);
      } else {
        // DEFAULT VALUES (NEW)
        // test this by clicking on the "new" button
        this.setState({bot: this.defaultBot});
      }
    },

    getMovie: function(movieId){
      var component = this;
      fetch(movieUrl(movieId))
        .then(checkStatus)
        .then(parseJSON)
        .then(this.setMovie)
        .catch(function(err){
          component.redirectToIndex({danger: ["Couldn't find movie  "+movieId]})
        })
    },

    // expects a partialFlash object (see App.jsx)
    redirectToIndex: function(partialFlash) {
      this.props.router.push({
        pathname: '/',
        state: {
          robots: [],
          flash: partialFlash
        }
      });
    },

    setMovie: function(responseData){
      console.log("REQUEST SUCCESS", responseData);
      this.setState({bot: responseData});
    },

    setName: function(newName){
      var bot = this.state.bot;
      bot.name = newName;
      console.log("SET MOVIE NAME:", bot);
      this.setState({bot: bot});
    },

    submitForm: function(event){
      event.preventDefault(); // prevents the redirect route from receiving params (e.g. http://localhost:3000/#/?_k=10eu8m rather than http://localhost:3000/?description=fun+times#/?_k=kua7fi)
      console.log("SUBMITTING FORM DATA", this.state.bot, "WITH ACTION", this.state.formAction);
      switch (this.state.formAction) {
        case "CREATE_ROBOT":
          this.createMovie();
          break;
        case "UPDATE_ROBOT":
          this.updateMovie();
          break;
      };
    },

    createMovie: function(){
      var component = this;
      var requestOptions = postRequestOptions({
        movieName: this.state.bot.name,
        movieGenre: this.state.bot.genre,
        movieYear: this.state.bot.year,
        movieRating: this.state.bot.rating,
        movieCast: this.state.bot.cast,
        movieDescription: this.state.bot.description
      })
      fetch(createMovieUrl, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(json){
          component.redirectToIndex({success: ["Created movie "+json.name]})
        })
        .catch(function(err){
          err.response.json().then(function(json){
            component.redirectToForm({warning: json.messages}, json.bot)
          })
        })
    },

    deleteMovie: function(movieId){
      var component = this;
      var requestUrl = '/api/movies/'+movieId+"/destroy";
      var requestOptions = {method: 'post'}
      console.log("AJAX REQUEST", requestUrl);
      fetch(requestUrl, requestOptions).then(function(response){
          var flash = response.ok ? {success: ["Deleted movie #"+movieId]} : {danger: ["Couldn't delete movie #"+movieId]};
          component.props.router.push({
              pathname: '/',
              state: {flash: flash}
          });
      }); // fetch
    },

    redirectToForm: function(partialFlash, formBot){
      this.props.router.push({
        pathname: '/movies/new',
        state: {
          flash: partialFlash,
          bot: formBot
        }
      });
    },

    updateMovie: function(){
      var component = this;
      var requestUrl = "/api/movies/"+this.state.bot._id+"/update";
      console.log("AJAX", requestUrl, "WITH DATA", this.state.bot)
      var requestOptions = postRequestOptions({
          movieName: this.state.bot.name,
          movieGenre: this.state.bot.genre,
          movieYear: this.state.bot.year,
          movieRating: this.state.bot.rating,
          movieCast: this.state.bot.cast,
          movieDescription: this.state.bot.description
      })
      fetch(requestUrl, requestOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(json){
          component.redirectToIndex({success: ["Updated movie "+json.name]})
        })
        .catch(function(err){
          err.response.json().then(function(json){
            component.props.router.push({
              pathname: '/movies/'+ json.bot._id +'/edit',
              state: {
                flash: {warning: json.messages},
                formBot: json.bot
              }
            });
          })
        })
    },

      render: function(){
          return (
              <form id="movies-form" className="form-horizontal" onSubmit={this.submitForm}>
                  <MoviesFormInputName params={this.props.params} bot={this.state.bot} setName={this.setName}/>

                  <MoviesFormSubmitButton bot={this.state.bot}/>
              </form>
          )
      }
  })
);

module.exports = MoviesForm;
