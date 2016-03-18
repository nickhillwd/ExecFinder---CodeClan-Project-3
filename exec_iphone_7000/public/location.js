window.onload = function(){

  var getLocation = function(event){
    event.preventDefault();

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    }else{
      location.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    location.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

    //AJAX POST to 5000/updateLocation
    var url = 'https://fathomless-spire-32585.herokuapp.com/updateLocation'
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader('Access-Control-Request-Headers', 'Content-Type');
    request.withCredentials = true;
    request.onload = function(){
      if(request.status === 200){
        console.log('updated location');  
      }else{
        console.log('ERROR: location no updated')
      }
    }

    var locationData = {
      "id": testUserId,
      "update":{"local.location.lat": position.coords.latitude, "local.location.long": position.coords.longitude}
    }
    request.send(JSON.stringify(locationData));
  }

  var location = document.getElementById('location');
  var locationButton = document.getElementById('locationButton');
  locationButton.addEventListener('click', getLocation);

}