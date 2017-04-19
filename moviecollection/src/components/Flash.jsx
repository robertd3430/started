import React from 'react';

var Flash = React.createClass({

  //
  // EVENT LIFECYCLE
  //

  componentDidMount: function(){
    console.log("FLASH DID MOUNT");
  },

  componentWillReceiveProps: function(nextProps){
    console.log("FLASH WILL RECEIVE PROPS");
  },

  componentWillUpdate: function(nextProps, nextState){
    console.log("FLASH WILL UPDATE");
  },

  render: function(){
    var component = this;
    var flash = component.props.flashHash;
    //console.log("FLASH", flash)
    var flashMessages = Object.keys(flash).map(function(messageType){
        var messages = flash[messageType];

        return (
            messages.map(function(messageContent, messageIndex){
                var messageParams = {messageType: messageType, messageIndex: messageIndex};
                var messageId = messageType + "-" + messageIndex;
                return (
                    <div key={messageId} className={"alert alert-" + messageType + " alert-dismissible"} role="alert">
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true" onClick={component.props.removeFromFlash.bind(null, messageParams)}>
              &times;
            </span>
                      </button>
                        {messageContent}
                    </div>
                );
            })
        )
    });
    return (
        <div className="flash-messages">
            {flashMessages}
        </div>
    )
  }
});

module.exports = Flash;
