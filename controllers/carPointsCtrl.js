// Контроллер отвечает за создание(acceptMaxMinLatLindValue) и хранение(carPoints) информации о машинах, 
// За обработку и обновление информации отвечает mapPoinsCtrl


app.controller("carPointsCtrl", function ($scope, $rootScope) {
	$scope.carPoints = [];
	$scope.constolShowHide = false;
	var storeIcon = L.icon({
	    iconUrl: './assets/libs/leaflet/images/truck.png',
	    iconSize:     [24, 24], 
	    iconAnchor:   [12, 24]
	});
	$scope.acceptMaxMinLatLindValue = function(latMin, latMax, lngMin, lngMax){
		for(var i = 0; i < 10; i++){
			var randLat = random(latMin, latMax);
			var randLng = random(lngMin, lngMax);
			var randCarrying = random(3, 5);
			var icon = L.marker([randLat, randLng], {
				icon: storeIcon,
				draggable: true,
				title: 'авто_'+(i+1),
				key: "carPoint"+(i+1),
				carrying: randCarrying
			});
			icon.addTo(mymap);

			$scope.carPoints.push({
				title: 'авто_'+(i+1),
				position: {
					lat: randLat,
					lng: randLng
				},
				icon: icon,
				carrying: randCarrying
			});
		}
		$scope.$emit('readyCarPoints', $scope.carPoints);
	};

});