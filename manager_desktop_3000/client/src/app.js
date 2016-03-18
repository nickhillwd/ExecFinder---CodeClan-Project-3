var React = require('react');
var ReactDOM = require('react-dom');
var Container = require('./components/Container');

window.onload = function(){
  ReactDOM.render(
    <Container url="https://fathomless-spire-32585.herokuapp.com"></Container>,
    document.getElementById('app')
  );
}