var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
// Create variable to hold map element, give initial settings to map
var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 20, attribution: osmAttrib});
// Add OpenStreetMap tile layer to map element
map = L.map('map', {center: [46.5, 6.4194],layers: osm,zoom: 6.45,zoomControl:false});
console.log("#{resultat}")