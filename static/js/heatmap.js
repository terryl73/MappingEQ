var myMap = L.map("map", {
  center: [0, 0],
  zoom: 2
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

d3.json(url, function(response) {

  console.log(response);

  var LocationArray = [];
  var MagArray = [];

  console.log(response.features.length);

  for (var i = 0; i < response.features.length; i++) {
    console.log("Response item");
    console.log(response.features[i]);
    
    var location = response.features[i].geometry.coordinates;
    var magnitude = response.features[i].properties.mag;

    console.log(location);
    console.log(magnitude);

    if (location) {
      LocationArray.push([location[1], location[0]]);
      MagArray.push(magnitude);
    }
  }

  console.log(LocationArray);
  console.log(MagArray);

  var heat = L.heatLayer(LocationArray, {
    radius: 500,
    blur: 35
  }).addTo(myMap);

});
