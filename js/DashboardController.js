angular.module('myAngularApplication.DashboardController', [])

	.controller('DashboardController', function ($scope, $timeout, DASHService) {

		function getDataServer() {
			// -- Getting Data From Server. 
			DASHService.getDataFromServer().then(function (getData) {
				$scope.sampleData = angular.copy(getData);
				$scope.sampleData.forEach(function (item) {
					item.editable = false;
					item.btn_value = "Edit";
				})
				console.log($scope.data);

			}, function (err) {
				console.log("error");
			})
		}
		getDataServer();

		//$scope.sampleData = sampleData;
		$scope.editState = {
			btn_value: 'Edit',
			editModel: false,
			toggle: function () {
				this.editModel = !this.editModel;
			}
		}
		$scope.btn_click = function (id, index) {
			if ($scope.sampleData[index].editable) {
				var sendingObject = angular.copy($scope.sampleData[index]);
				$scope.uploadDataToServer(id, index, sendingObject);

			} else {
				$scope.sampleData[index].editable = true;
				$scope.sampleData[index].btn_value = 'Save';
			}
		}

		// -- Putting Data to Server. 
		$scope.uploadDataToServer = function (id, index, object) {
			if (object.hasOwnProperty("editable")) {
				delete object["editable"];
			}
			if (object.hasOwnProperty("btn_value")) {
				delete object["btn_value"]
			}
			DASHService.uploadDataToServer(id, object).then(function (uploadData) {
					uploadData.editable = false;
					uploadData.btn_value = 'Edit';
					$scope.sampleData[index] = angular.copy(uploadData);

				},
				function (error) {});
		}
	});
