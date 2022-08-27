//set map options
var mylatlng = {lat: 43.8561, lng: -79.3370}
var mapOptions = {
	center: mylatlng,
	zoom: 10,
	mapTypeId: 'roadmap',
	zoomControl: true,
 	rotateControl: true,
  	mapTypeControl: false,
   	scaleControl: true,



}
//create map and marker
var map = new google.maps.Map(document.getElementById('map'), mapOptions);

//create a directions service object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create directionsRenderer object which displays route
var directionsDisplay = new google.maps.DirectionsRenderer(); 

//bind the directionsRenderer to map

directionsDisplay.setMap(map); 

/*
function createMarker (result) {
	var name = result.name
	console.log(result)
	var marker = new google.maps.Marker ({
		map: map,
		place: {
			placeId: result.place_id,
			location: result.geometry.location 
		}
	})

	var infoWindow = new google.maps.InfoWindow({
		content: '<h1>' + name + '</h1>'
	})

	marker.addListener("click", () => {
	    infoWindow.open({
	      anchor: marker,
	      map,
	      shouldFocus: true	
	    });
	  });
}

function callback (results, status) {
	if (status == 'OK') {
		for (var i = 0; i < results.length; i++) {
			console.log(results[i]); 
			var place_id = results[i].place_id; 
			var service = new google.maps.places.PlacesService(map);
	        service.getDetails({
	            placeId: place_id
	          }, function (place, status) {
	            createMarker(place)
	          });
		
		
		}
  	}
  	else console.log(status);
}
*/
async function getDistance () {
	//create request 
	var request = {
		origin: document.getElementById("from").value,
		destination: document.getElementById("to").value,
    	travelMode: 'DRIVING',
		unitSystem: google.maps.UnitSystem.METRIC
	} 

	// pass request to route method
	result =  await directionsService.route(request)
	directionsDisplay.setDirections(result); 
	return result.routes[0].legs[0].distance.text; 
}
	

var options = {
 	fields: ["formatted_address"],
 	componentRestrictions: {
 		country : 'CA',
 	}
}
var input1 = document.getElementById('from');
var autocomplete1 = new google.maps.places.Autocomplete(input1, options)

var input2 = document.getElementById('to');
var autocomplete2 = new google.maps.places.Autocomplete(input2, options)
