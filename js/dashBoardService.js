/*global angular*/
angular.module('myAngularApplication.dashBoardService', [])

	.factory('DASHService', function ($http, $q, $rootScope) {
		return {
			makePutRequest: function (parameters) {
				var deferred = $q.defer();
				$http.put('https://devbackend.gscmaven.com:8443/omsservices/webapi/systemconfig/1', parameters).then(
					function (data) {
						deferred.resolve(data);
					},
					function (data) {
						deferred.reject(data);
					});
				return deferred.promise;
			},
			makeGetRequest: function () {
				var deferred = $q.defer();
				/*
				            $http.get('http://172.16.220.116:8080/TestWebService/webresources/putTst').then(
				*/
				$http.get('https://devbackend.gscmaven.com:8443/omsservices/webapi/systemconfig').then(
					function (data) {
						deferred.resolve(data.data);
					},
					function (data) {
						deferred.reject(data);
					});
				return deferred.promise;
			},
			makePutRequest: function (id, parameters) {
				var deferred = $q.defer();
				var req = {
					method: 'PUT',
					url: 'https://devbackend.gscmaven.com:8443/omsservices/webapi/systemconfig/' + id,
					headers: {
						"glhashcode": "$2a$10$7e60CWkOczJ8GiQiY6pRMOsYhFKaTbMehc81YpmqOx4jadEe/mpZG",
						'Content-Type': "application/json",
					},
					data: parameters
				}
				$http(req).then(function (uploadResponse) {
					deferred.resolve(uploadResponse.data)
				}, function (uploadResponse) {
					deferred.reject(uploadResponse.data);
				})
				return deferred.promise;
			},
			uploadDataToServer: function (id, parameters) {
				return this.makePutRequest(id, parameters);
			},
			getDataFromServer: function () {
				return this.makeGetRequest();
			}
		}
	})
