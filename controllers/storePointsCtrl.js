// Контроллер отвечает за создание(acceptMaxMinLatLindValue) и хранение(storePoints) информации о складах, 
// За обработку и обновление информации отвечает mapPoinsCtrl


app.controller("storePointsCtrl", function ($scope, $rootScope) {
	$scope.storePoints = [];
	$scope.constolShowHide = false;
	$scope.acceptMaxMinLatLindValue = function(latMin, latMax, lngMin, lngMax){
		var storeIcon = L.icon({
		    iconUrl: './assets/libs/leaflet/images/storage.png',
		    iconSize:     [24, 24],
		    iconAnchor:   [12, 25] 
		});
		for(var i = 0; i < 10; i++){
			var randLat = random(latMin, latMax);
			var randLng = random(lngMin, lngMax);
			var icon = L.marker([randLat, randLng], {
				icon: storeIcon,
				title: 'склад_'+(i+1)
			});
			icon.addTo(mymap);
			$scope.storePoints.push({
				title: 'склад_'+(i+1),
				position: {
					lat: randLat,
					lng: randLng
				},
				icon:icon
			});
		}
		$scope.$emit('readyStorePoints', $scope.storePoints);
	};
});