var React = require('react');

var LogInForm = React.createClass({

  getInitialState: function(){
    return{email: '', password:'', resText: null}
  },

  handleEmailChange: function(event){
    this.setState({email: event.target.value})
  },

  handlePasswordChange: function(event){
    this.setState({password: event.target.value});
  },

  handleSubmit: function(event){
    event.preventDefault();
    console.log("form submitted to localhost:5000", this.state.email, this.state.password);
    this.logIn();
  },

  logIn: function(){
    var request = new XMLHttpRequest();
    request.open("POST", this.props.url);
    request.setRequestHeader('Access-Control-Request-Headers', 'Content-Type');
    request.setRequestHeader("Content-Type", "application/json");
    request.withCredentials = true;
    request.onload = function(){
      if(request.status === 200){
        var authResponse = JSON.parse(request.responseText);
        console.log("onload: ", request.responseText);
        this.updateResTextState(authResponse);
      }else{
        console.log("inside login: no response text");
      }
    }.bind(this);
    var data = {
      email:this.state.email.trim(),
      password:this.state.password.trim()
    }
    request.send(JSON.stringify(data));
  },

  updateResTextState: function(responseText){
    this.setState({resText: responseText});
    console.log("resEmailTextFromState: ", typeof(this.state.resText));
    console.log(responseText.local.email);  
    this.props.updateCurrentUser(responseText.local.email);
  },

  render: function(){
    return(

      <div>
        <h3>Log In Form</h3>
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <input type="submit" value="Post"/>
        </form>
      </div>

    );
  }

});

module.exports = LogInForm;