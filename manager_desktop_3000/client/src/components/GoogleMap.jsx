var React = require ('react');
var Map = require('../map.js');

var GoogleMap = React.createClass({

  componentDidMount: function(){
    var centre = {lat: 1, lng: 2};
    var zoom = 1;
    var map = new Map(centre, zoom);
    console.log(map);
  },

  render: function(){
    return(
      <div>
        <h3>Googley Woogley Mappy</h3>
        <div id='map'></div>
      </div>
    );
  }
});

module.exports = GoogleMap;