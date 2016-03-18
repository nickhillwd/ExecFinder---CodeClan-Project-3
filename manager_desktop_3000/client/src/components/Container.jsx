var React = require('react');
var LogInForm = require('./LogInForm.jsx');
var GoogleMap = require('./GoogleMap.jsx');
var ExecList = require('./ExecList.jsx');

var Container = React.createClass({

  getInitialState: function(){
    return {data: [], currentUser: null, allExecs: []}
    console.log("getInitialState: ", "data: ", this.state.data, "current user: ", this.state.currentUser)
  },

  fetchExecs: function(){
    var request = new XMLHttpRequest();
    request.open("GET", this.props.url + "/allExecs");
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;

    request.onload = function(){
      if(request.status === 200){
        console.log("fetchExecs responseText: ", request.responseText);
        this.setState({allExecs: JSON.parse(request.responseText)});
      }else if(request.status === 401){
        this.setState({allExecs: []});
      }
    }.bind(this);

    request.send(null);
  },

  onLoginSuccess: function(currentUser){
    this.setState({currentUser: currentUser})
    setInterval(this.fetchExecs,  1000);
    // this.fetchExecs();
  },

  render: function(){
    
    var mainDiv = <div>
      <h3>Please Log In</h3>
      <LogInForm url={this.props.url + "/login"} updateCurrentUser={this.onLoginSuccess} ></LogInForm>
    </div>

    if(this.state.currentUser){
      mainDiv = <div>
        <h3>Logged In!</h3>
        <ExecList allExecs={this.state.allExecs}></ExecList>
        <GoogleMap></GoogleMap>
      </div>
    }

    return(
      <div className="container">
        <h1>Container - This is good if we see this!</h1>
        {mainDiv}
      </div>
    );
  }

});

module.exports = Container;