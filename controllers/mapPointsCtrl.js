/* контроллер получает ссылки на массив с информацией о машинах и складах из carPointsCtrl и mapPointsCtrl
	контроллер отвечает за:
	- обработку событий
	- валидацию введеной пользователем информации
	- обновления данных о машинах и складах
	- фильтрацию информации перед выводом
*/


app.controller("mapPointsCtrl", function ($scope, $rootScope) {
	$scope.showHideCarCarrying = false;
	$scope.showHideStoreCar = false;
	$scope.showHideStoreForm = false;
	$scope.$on('readyCarPoints', function (event, carPoints) {
		for(var i = 0; i < carPoints.length; i++){
			carPoints[i].icon.on('dragend', function(e){
				for(var j = 0; carPoints.length > j; j++){
					if(carPoints[j].title == e.target.options.title){
						carPoints[j].position.lat = e.target['_latlng'].lat;
						carPoints[j].position.lng = e.target['_latlng'].lng;
						$scope.$digest();
						break;
					}
				}
			}).on('dblclick', function(e){
				$scope.currentItem = e;
				$scope.showHideCarCarrying = true;
				$scope.showHideStoreCar = false;
				$scope.showHideStoreForm = false;
				$scope.$digest();
			});;
		}
	});
	$scope.filterCarrying = function(item){
		if($scope.currentItem.target.options.title == item.title){
			return false;
		}
		return $scope.currentItem.target.options.carrying < item.carrying;
	};
	$scope.orderOfDistance = function(item){
		return  Math.sqrt( Math.pow(item.position.lat - $scope.currentItem.target._latlng.lat, 2) + Math.pow(item.position.lng - $scope.currentItem.target._latlng.lng, 2) );
	};
	$scope.closeCarCarrying = function(){
		$scope.showHideCarCarrying = false;
	};
	$scope.closeStoreCar = function(){
		$scope.showHideStoreCar = false;
	};
	$scope.closeForm = function(){
		$scope.showHideStoreForm = false;
	}


	$scope.updateStorePoint = {};
	var storeEventInfoClick;
	$scope.$on('readyStorePoints', function (event, storePoints) {
		for(var i = 0; i < storePoints.length; i++){
			storePoints[i].icon.on('click', function(e){
				for(var j = 0; storePoints.length > j; j++){
					if(storePoints[j].title == e.target.options.title){
						storeEventInfoClick = j;
						$scope.updateStorePoint.lat = storePoints[j].position.lat;
						$scope.updateStorePoint.lng = storePoints[j].position.lng;
						$scope.showHideCarCarrying = false;
						$scope.showHideStoreCar = false;
						$scope.showHideStoreForm = true;
						$scope.$digest();
						break;
					}
				}
			}).on('dblclick', function(e){
				$scope.currentItem = e;
				$scope.showHideStoreCar = true;
				$scope.showHideStoreForm = false;
				$scope.showHideCarCarrying = false;
				$scope.$digest();
			});;;
		}
		$scope.updateLatLing = function(updateStorePoint, isvalid){
			if (isvalid) {
    	       $scope.showError = false;
    	       storePoints[storeEventInfoClick].icon.setLatLng([updateStorePoint.lat, updateStorePoint.lng]).update();
    	       storePoints[storeEventInfoClick].position.lat = updateStorePoint.lat;
    	       storePoints[storeEventInfoClick].position.lng = updateStorePoint.lng;
    	    }
    	    else {
    	        $scope.showError = true;
    	    }
		};
	});
	$scope.matchPattern = (function(test){
		return {
        	test: function(value) {
        	    return value == Number(value);
        	}
    	};
	})();
	$scope.getError = function (error) {
         if (angular.isDefined(error)) {
             if (error.required) {
                 return "Поле не должно быть пустым";
             }
             else if (error.pattern) {
                 return "Поле содержит некорректную информацию ";
             }
         }
     }
});