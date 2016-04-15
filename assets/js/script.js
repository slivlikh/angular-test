var mymap = L.map('mapid').setView([50.4439533, 30.5281376], 8);
document.addEventListener("DOMContentLoaded", function(){

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			maxZoom: 18,
			id: 'mapbox.streets'
		}).addTo(mymap);



// В переменной kiev хранится geojson Киевской области, определяем min и max значение широты и долготы для определения 
// периметра расположения складов и машин

	var kievLenght = kiev.geometry.coordinates[0].length;
	var kievKoord = kiev.geometry.coordinates[0];
	var latMin = latMax = kievKoord[0][1];
	var longiMin = longiMax = kievKoord[0][0];
	for(var i = 1; i < kievLenght; i++){
		if(latMin > kievKoord[i][1]){
			latMin = kievKoord[i][1];
		}
		if(latMax < kievKoord[i][1]){
			latMax = kievKoord[i][1];
		}
		if(longiMin > kievKoord[i][0]){
			longiMin = kievKoord[i][0];
		}
		if(longiMax < kievKoord[i][0]){
			longiMax = kievKoord[i][0];
		}
	}

// передаем min и max значение широты и долготы в контроллеры
	angular.element(IDstorePointsCtrl).scope().$apply("acceptMaxMinLatLindValue("+latMin+", "+latMax+", "+longiMin+", "+longiMax+")");
	angular.element(IDcarPointsCtrl).scope().$apply("acceptMaxMinLatLindValue("+latMin+", "+latMax+", "+longiMin+", "+longiMax+")");


	L.geoJson(kiev, {
			style: function (feature) {
				return feature.properties && feature.properties.style;
			},

			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, {
					radius: 8,
					fillColor: "#ff7800",
					color: "#000",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.8
				});
			}
		}).addTo(mymap);
});


function random(min, max) {
	var rand = min + Math.random() * (max - min)
	return rand;
}