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
				templateUrl : '/partials/grid.html'
			})
			.when('/:anchor', {
				controller : 'InfoCtrl',
				templateUrl : '/partials/info.html'
			})
	}])
	.factory('Manga', ['$resource', function($resource){
		return $resource('https://www.mangaeden.com/api/list/0/?p=0&l=50') 
	}])
	.controller('MainCtrl', ['$scope', 'Manga', function($scope, Manga){
		$scope.MangaList = [];

		Manga.get({}, function(manga){
			$scope.MangaList = manga.manga;
		}); 
	}])
	.controller('HomeCtrl', ['$scope', function($scope){
		$scope.message = 'Welcome to Homepage';
	}])
	.controller('PopularCtrl', ['$scope', function($scope){
		$scope.message = 'popular';

			console.log($scope.MangaList);
	}])
	.controller('InfoCtrl', ['$scope', function($scope){
		$scope.message = 'info'
	}])