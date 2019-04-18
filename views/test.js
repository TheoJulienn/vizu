var ranger = L.control({position: 'bottomleft'});

		ranger.onAdd = function (map) {

		    var div = L.DomUtil.create('div', 'ranger legend')

		    div.innerHTML += '<div class="slidecontainer"><input class="slider" id="myRange" type="range" min="1" max="12" value="1" /></div>'
	

		    return div;
		};





		var legend = L.control({position: 'bottomright'});
		legend.onAdd = function (map) {

		    var div = L.DomUtil.create('div', 'info legend'),
		        grades = [0, 100, 250, 500, 750, 1000, 1250, 1500,1750],
		        labels = [];

		    // loop through our density intervals and generate a label with a colored square for each interval
		    for (var i = 0; i < grades.length; i++) {
		        div.innerHTML +=
		            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
		            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
		    }

		    return div;
		};