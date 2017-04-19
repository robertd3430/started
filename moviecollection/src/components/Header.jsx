import React from 'react';
import { Link, withRouter } from 'react-router';

var Header = withRouter(
  React.createClass({

  render: function(){
      var buttonStyle = {marginLeft: "0.5em", marginTop:"0.7em"};
      return (
          <header>
              <div id="flash-messages"></div>

              <h1><Link to="/">{this.props.title}</Link></h1>

              <Link to="/movies/new" type="button" className="btn btn-primary pull-right" style={buttonStyle}>
                  <span className="glyphicon glyphicon-plus"></span> new
              </Link>

          </header>
      )
    }
  })
);

module.exports = Header;
