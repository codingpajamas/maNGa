'use strict'

angular.module('mangaApp', ['ngRoute', 'ngResource'])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				controller : 'HomeCtrl',
				templateUrl : '/partials/home.html'
			})
			.when('/popular', {
				controller : 'PopularCtrl',
				templateUrl : '/partials/popular.html'
			})
			.when('/latest', {
				controller : 'LatestCtrl',
				templateUrl : '/partials/latest.html'
			})
			.when('/:anchor', {
				controller : 'InfoCtrl',
				templateUrl : '/partials/info.html'
			})
	}])
	.factory('Manga', ['$resource', function($http){
		return $http('https://www.mangaeden.com/api/list/0/?p=0&l=50') 
	}])
	.controller('MainCtrl', ['$scope', 'Manga', function($scope, Manga){
		$scope.allManga = [];
		$scope.popularManga = [];
		$scope.latestManga = []; 

		Manga.get({}, function(manga){
			$scope.allManga = _.sortBy(manga.manga, 'a');
			$scope.popularManga = _.sortByOrder(manga.manga, ['h'], ['desc']);
			$scope.latestManga = _.sortByOrder(_.filter(manga.manga, 'ld'), ['ld'], ['desc']);  
			$scope.$broadcast('websiteReady', true); 
		}); 
	}])
	.controller('HomeCtrl', ['$scope', function($scope){
		$scope.homePopularManga =  _.slice($scope.popularManga, 0, 5);
		$scope.homeLatestManga =  _.slice($scope.latestManga, 0, 5);

		$scope.$on('websiteReady', function(event, data){ 
			$scope.homePopularManga =  _.slice($scope.popularManga, 0, 5);
			$scope.homeLatestManga =  _.slice($scope.latestManga, 0, 5);
		})
	}])
	.controller('PopularCtrl', ['$scope', function($scope){
		$scope.mangaList = $scope.popularManga;   
		$scope.$on('websiteReady', function(event, data){ 
			$scope.mangaList = $scope.popularManga; 
		})
	}])
	.controller('LatestCtrl', ['$scope', function($scope){
		$scope.mangaList = $scope.popularManga;  
		$scope.$on('websiteReady', function(event, data){ 
			$scope.mangaList = $scope.popularManga;
		})
	}])
	.controller('InfoCtrl', ['$scope', function($scope){
		$scope.message = 'info';
		console.log($scope.latestManga);
	}])