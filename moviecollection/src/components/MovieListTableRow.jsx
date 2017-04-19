import React from 'react';
import { Link, withRouter } from 'react-router';

var MovieListTableBodyTableRow = withRouter (
  React.createClass({

    editMovie: function(movie){
      var movieId = movie._id;
      console.log("EDIT MOVIE #", movieId);
      this.props.router.push({
        pathname: '/movies/'+movieId+'/edit',
        state: {
          showBot: movie
        }
      });
    },

    deleteMovie: function(movieId){
      var component = this;
      var requestUrl = '/api/movies/'+movieId+"/destroy";
      var requestOptions = {method: 'post'}
      console.log("AJAX REQUEST", requestUrl);
      fetch(requestUrl, requestOptions).then(function(response){
        var flash = response.ok ? {success: ["Deleted movie "]} : {danger: ["Couldn't delete movie "]};
        component.props.router.push({
          pathname: '/',
          state: {flash: flash}
        });
      }); // fetch
    },

    render: function(){
      var movie = this.props.movie;
      return (
          <tr>
              <td>{movie.name}</td>
              <td>{movie.genre}</td>
              <td>{movie.year}</td>
              <td>{movie.rating}</td>
              <td>{movie.cast}</td>
              <td>
                  <button className='btn btn-warning btn-edit-robot' onClick={ this.editMovie.bind(null, movie) }>
                      <span className="glyphicon glyphicon-pencil"></span> edit
                  </button>
              </td>
              <td>
                  <button className='btn btn-danger' onClick={ this.deleteMovie.bind(null, movie._id) }>
                      <span className="glyphicon glyphicon-trash"></span> delete
                  </button>
              </td>
          </tr>
      )
    }
  })
);

module.exports = MovieListTableBodyTableRow;
