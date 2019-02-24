
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(url, function(response) {

  var baselayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

  var LocationArray = [];
  var MagArray = [];

  console.log("Number of EQ:")
  console.log(response.features.length);

  for (var i = 0; i < response.features.length; i++) {
    
    var location = response.features[i].geometry.coordinates;
    var magnitude = response.features[i].properties.mag;

    if (location) {
      LocationArray.push(([location[1], location[0]]));
      MagArray.push(magnitude);
    }
  }

    var EQMarkers = [];

    // LocationArray = [[0, 0]];
    // MagArray = [0.9];

    for (var i = 0; i < LocationArray.length; i++) {

        if (MagArray[i] < 1) {MagColor = "green"}
          else if (MagArray[i] < 2) {MagColor = "yellowgreen" }
          else if (MagArray[i] < 3) {MagColor = "yellow"}
          else if (MagArray[i] < 4) {MagColor = "orange"}
          else if (MagArray[i] < 5) {MagColor = "orangered"}
          else if (MagArray[i] > 5) {MagColor = "red"}
          else {Magcolor = "grey"}

        console.log(MagArray[i]);
        console.log(MagColor);
        console.log("---------")

        EQMarkers.push(
            L.circle(LocationArray[i], {
            stroke: false,
            fillOpacity: 0.75,
            color: MagColor,
            fillColor: MagColor,
            radius: MagArray[i]*50000
            })
        );
    }

    var EQLayer = L.layerGroup(EQMarkers);

    var myMap = L.map("map", {
      center: [0, 0],
      zoom: 2,
      layers: [baselayer, EQLayer]
    });

  // Could not get tool tips to pop up.
    for (var i = 0; i < LocationArray[i].length; i++) {
      spot = LocationArray[i];
      L.marker(spot)
        .Tooltip("<h1>" + "Date" + "</h1> <hr> <h3> Magnitude" + MagArray[i] + "</h3>")
        .addTo(myMap);
    }
});