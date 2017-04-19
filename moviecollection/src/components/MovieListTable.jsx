import React from 'react';
import MovieListTableHead from './MovieListTableHead.jsx';
import MovieListTableBody from './MovieListTableBody.jsx';

var MovieListTable = React.createClass({

  render: function(){
    return (
      <table className="table table-bordered table-hover table-responsive" style={{width:"100%"}}>

      <MovieListTableHead/>
      <MovieListTableBody params={this.props.params} setPageTitle={this.props.setPageTitle}/>

      </table>
    )
  }
});

module.exports = MovieListTable;
