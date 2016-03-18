var React = require('react');

var ExecList = React.createClass({

  render: function(){

    var execs = this.props.allExecs.map(function(item, index){
      if(item.local.location){
        return <li key={index}> {item.local.email} Latitude: {item.local.location.lat} Longitude: {item.local.location.long}</li>
      }
    });

    return(
      <div>
        <h3>List of Sales Execs</h3>
        <ul>
          {execs}
        </ul>
      </div>
    );
  }

});

module.exports = ExecList;