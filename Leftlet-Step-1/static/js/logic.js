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

  function getColorValue(number) {
  
    if (number >= 90 ) {
      return 'red'
    } else if (number >= 70) {
      return '#32CD32'
    } else if (number >= 50) {
      return '#00FA9A'
    } else if (number >= 30) {
      return '#FF8C00'
    } else if (number >= 10) {
      return '#FFA07A'
    } else if (number >= -10) {
      return '#FF00FF'
    } else {
      return 'pink'
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
        fillColor: getColorValue(feature.geometry.coordinates[2]),
        fillOpacity: 0.5,
        weight: 1.5,
        radius: Radius(feature.properties.mag)
      };
    }
  }).addTo(earthquakes)
  earthquakes.addTo(map)

// function legend() {
//   var legend = L.control({ position: "bottomright" });
//    legend.onAdd = function() {
//     var div = L.DomUtil.create("div", "info legend");
//     var labels 
    
//     div.innerHTML = legendInfo;
    
//     var limits = [-10, 10, 30, 50, 70, 90];

//    limits.forEach(function(limit, index) {
//     labels.push("<li style=\"background-color: " + getColorValue(limits[index]) + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//    }

//     return div;

//   }
  
//   return legend;
// }
// legend.addTo(map);

var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [-10, 10, 30, 50, 70, 90];
    var colors = ['red', '#32CD32', '#00FA9A', '#FF8C00', '#FFA07A', '#FF00FF', 'pink'];
    var labels = [];

    // Add min & max
    var legendInfo = "<h1> Depth </h1>";
      // "<div class=\"labels\">" +
      //   "<div class=\"1\">" + limits[0] + "</div>" +
      //   "<div class=\"2\">" + limits[limits.length - 1] + "</div>" +
      // "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      var newHtml = `<i style="background: colors[index]"></i>`;

      newHtml += limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
  
      div.innerHTML += newHtml;
  });


  // Adding legend to the map
legend.addTo(map);
});
