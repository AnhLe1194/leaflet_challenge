var lightmap = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
      }
    );

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  var earthquakes = new L.LayerGroup()
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options
    var map = L.map("mapid", {
      center: [-66.9471, 17.9455],
      zoom: 3,
      layers: [lightmap, earthquakes]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  
 
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data){
  function Radius(mag){
    return mag*4
  }

  function Color(depth){
    switch (depth) {
    case "Brooklyn":
        return "yellow";
    case "Bronx":
        return "red";
    case "Manhattan":
        return "orange";
    case "Queens":
        return "green";
    case "Staten Island":
        return "purple";
    default:
        return "black";
    }
  }

  L.geoJson(data, {
    pointToLayer: function(feature, coordinate){
      return L.circleMarker(coordinate)
    },
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: Color(feature.geometry.coordinates[2]),
        fillOpacity: 0.5,
        weight: 1.5,
        radius: Radius(feature.properties.mag)
      };
    }
  }).addTo(earthquakes)
  earthquakes.addTo(map)
});


// Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "light-v10",
//   accessToken: API_KEY
// });

// // Initialize all of the LayerGroups we'll be using
// var layers = {
//   WEAKER: new L.LayerGroup(),
//   WEAK: new L.LayerGroup(),
//   NORMAL: new L.LayerGroup(),
//   STRONG: new L.LayerGroup(),
//   STRONGER: new L.LayerGroup()
// };

// // Create the map with our layers
// var map = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12,
//   layers: [
//     layers.WEAKER,
//     layers.WEAK,
//     layers.NORMAL,
//     layers.STRONG,
//     layers.STRONGER
//   ]
// });

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// // Create an overlays object to add to the layer control
// var overlays = {
//   "WEAKER": layers.WEAKER,
//   "WEAK": layers.WEAK,
//   "NORMAL": layers.NORMAL,
//   "STRONG": layers.STRONG,
//   "STRONGER": layers.STRONGER
// };

// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);

// // Initialize an object containing icons for each layer group
// var icons = {
//   WEAKER: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   WEAK: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   NORMAL: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   STRONG: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   STRONGER: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   })
// };

// // Perform an API call to the Citi Bike Station Information endpoint
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(infoRes) {

//   // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
//   d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(statusRes) {
//     var updatedAt = infoRes.last_updated;
//     var earthquakeStatus = statusRes.data.stations;
//     var earthquakeInfo = infoRes.data.stations;

//     // Create an object to keep of the number of markers in each layer
//     var earthquakeCount = {
//       COMING_SOON: 0,
//       EMPTY: 0,
//       LOW: 0,
//       NORMAL: 0,
//       OUT_OF_ORDER: 0
//     };

//     // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
//     var earthquakeStatusCode;

//     // Loop through the stations (they're the same size and have partially matching data)
//     for (var i = 0; i < earthquakeInfo.length; i++) {

//       // Create a new station object with properties of both station objects
//       var earthquake = Object.assign({}, earthquakeInfo[i], earthquakeStatus[i]);
//       // If a station is listed but not installed, it's coming soon
//       if (earthquake.properties.mag <= 1) {
//         earthStatusCode = "WEAKER";
//       }
//       // If a station has no bikes available, it's empty
//       else if (earthquake.properties.mag <= 2) {
//         earthquakeStatusCode = "EMPTY";
//       }
//       // If a station is installed but isn't renting, it's out of order
//       else if (earthquake.properties.mag <= 3) {
//         stationStatusCode = "OUT_OF_ORDER";
//       }
//       // If a station has less than 5 bikes, it's status is low
//       else if (earthquake.properties.mag <= 4) {
//         stationStatusCode = "LOW";
//       }
//       // Otherwise the station is normal
//       else {
//         stationStatusCode = "NORMAL";
//       }

//       // Update the station count
//       stationCount[stationStatusCode]++;
//       // Create a new marker with the appropriate icon and coordinates
//       var newMarker = L.marker([station.lat, station.lon], {
//         icon: icons[stationStatusCode]
//       });

//       // Add the new marker to the appropriate layer
//       newMarker.addTo(layers[stationStatusCode]);

//       // Bind a popup to the marker that will  display on click. This will be rendered as HTML
//       newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
//     }

//     // Call the updateLegend function, which will... update the legend!
//     updateLegend(updatedAt, stationCount);
//   });
// });

// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }