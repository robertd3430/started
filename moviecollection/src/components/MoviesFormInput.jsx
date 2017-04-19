import React from 'react';

var MoviesFormInput = React.createClass({

    componentWillMount: function(){
        console.log("FORM NAME -- WILL MOUNT", this.props.bot);
    },

    componentWillReceiveProps: function(nextProps) {
        console.log("FORM NAME -- RECEIVE PROPS", nextProps.bot);
    },

    componentWillUpdate: function(nextProps, nextState){
        console.log("FORM NAME -- WILL UPDATE", nextProps.bot);
    },

    handleInputChange:function(e) {
        e.preventDefault();
        var name = e.target.name;
        var state = this.props.bot;
        state[name] = e.target.value;
        this.setState(state);
    },

  render: function(){
    return (
      <div className="form-group">
        <label for="movieName" className="col-sm-2 control-label">Name</label>
        <div className="col-sm-10">
          <input id="movie-name" type="text" className="form-control" name="name" ref="movieNameRef" placeholder="Movie Name" value={this.props.bot.name} onChange={this.handleInputChange}/>
        </div>
        <label for="movieGenre" className="col-sm-2 control-label">Genre</label>
        <div className="col-sm-10">
          <input id="movie-genre" type="text" className="form-control" name="genre" ref="movieGenreRef" placeholder="Movie Genre" value={this.props.bot.genre} onChange={this.handleInputChange}/>
        </div>
        <label for="movieYear" className="col-sm-2 control-label">Year</label>
        <div className="col-sm-10">
          <input id="movie-year" type="text" className="form-control" name="year" ref="movieYearRef" placeholder="Movie Year" value={this.props.bot.year} onChange={this.handleInputChange}/>
        </div>
        <label for="movieRating" className="col-sm-2 control-label">Rating</label>
        <div className="col-sm-10">
          <input id="movie-rating" type="text" className="form-control" name="rating" ref="movieRatingRef" placeholder="Movie Rating" value={this.props.bot.rating} onChange={this.handleInputChange}/>
        </div>
        <label for="movieCast" className="col-sm-2 control-label">Cast</label>
        <div className="col-sm-10">
          <input id="movie-cast" type="text" className="form-control" name="cast" ref="movieCastRef" placeholder="Movie Cast" value={this.props.bot.cast} onChange={this.handleInputChange}/>
        </div>
      </div>
    )
  }

});

module.exports = MoviesFormInput;
