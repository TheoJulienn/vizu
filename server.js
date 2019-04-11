const express = require('express');
const proj4 = require("proj4")
const test = require('./france2.json');
const fs = require('fs');
const app = express();
var turf = require('@turf/turf');
//on va voir si les points sont dans le polygon correspondant a la france metropolitaine
var  tab_france = test.features[0].geometry.coordinates[0]
proj4.defs([
    ["EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"],
    ["EPSG:4326","+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"],
]);

var json;
var result;
var data;
var minMax;



fs.readFile(__dirname + '/datas/data.json', 'utf8', function(err, contents) {    
    result = contents.toString().replace(/&quot;/g,'"');
    json = JSON.parse(result);
    console.log(json.liste.length + " carres");  
    data = convert_carre(json); 
    
});


// Routes
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {    
    res.render('map', {
        title: 'Carte',
        data : JSON.stringify(data),
    });
});


app.get('/graphe', (req, res) => {   
    const dt = data.donnes.find(p => p.id === req.query.id); 
    res.render('graphe', {
        title: 'graphe',
        data : JSON.stringify(data),
    });
});



const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});












//////////////////////////////////////////////////////////////////

function load_France(json)
{
    var coord = [];
    for (var i = 0; i < json.features.length; i++) {

        for (var j = 0; j < json.features[i].geometry.coordinates.length; j++) {
            for (var k = 0; k < json.features[i].geometry.coordinates[j].length; k++) {
                coord.push(json.features[i].geometry.coordinates[j][k]);
            }
        }
    }

   return coord;
}

function points_carre(x0,y0,echelle=15000)
{
    var liste_points = [];
    var conv0 = proj4("EPSG:2154","EPSG:4326",[parseFloat(x0),parseFloat(y0)]);
    liste_points.push([conv0[1],conv0[0]]);
    var x1 = x0 + echelle;
    var y1 = y0;
    var conv1 = proj4("EPSG:2154","EPSG:4326",[parseFloat(x1),parseFloat(y1)]);
    liste_points.push([conv1[1],conv1[0]]);
    var x2 = x0 + echelle;
    var y2 = y0 - echelle;
    var conv2 = proj4("EPSG:2154","EPSG:4326",[parseFloat(x2),parseFloat(y2)]);
    liste_points.push([conv2[1],conv2[0]]);
    var x3 = x0;
    var y3 = y0 - echelle;
    var conv3 = proj4("EPSG:2154","EPSG:4326",[parseFloat(x3),parseFloat(y3)]);
    liste_points.push([conv3[1],conv3[0]]);
    liste_points.push([conv0[1],conv0[0]]);
    return liste_points
}

function convert_carre(json)
{
    var data = {
        donnes : []
    }

    json.liste.forEach(function(element) {
        var x0 = element.coordinates.x0;
        var y0 = element.coordinates.y0;
        var carre = points_carre(x0,y0);
        if(in_France(carre))
        {
            carre.splice(-1,1)
            data.donnes.push({
                pts : carre,
                id : element.id,
                use : element.utilization,
            })   
        }
      
    });
    return data
}

function in_France(liste,france = tab_france)
{
    var polygon = turf.polygon([liste]);
    var centroid = turf.centroid(polygon);
    var polyfrance = turf.polygon([tab_france]);
    var carre = turf.point([centroid.geometry.coordinates[1],centroid.geometry.coordinates[0]]);
    return turf.booleanPointInPolygon(carre, polyfrance);

}