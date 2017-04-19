import React from 'react';

var MovieListTableBodyTableHead = React.createClass({
  render: function(){
    return (
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Year</th>
          <th>Rating</th>
          <th>Cast</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
    )
  }
});

module.exports = MovieListTableBodyTableHead;
