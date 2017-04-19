import React from 'react';

var MoviesFormDeleteButton = React.createClass({

  //
  // EVENT LIFECYCLE
  //

  componentWillMount: function(){
    console.log("FORM SUBMIT BUTTON WILL MOUNT", this.props.bot)
  },

  componentWillReceiveProps: function(nextProps) {
    console.log("FORM SUBMIT BUTTON DID RECEIVE PROPS", nextProps.bot)
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("FORM SUBMIT BUTTON WILL UPDATE", nextProps.bot)
  },

    render: function(){
        return (
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-danger">Delete</button>
              </div>
            </div>
        )
    }
});

module.exports = MoviesFormDeleteButton;
