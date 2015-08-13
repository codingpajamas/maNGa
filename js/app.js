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
				templateUrl : '/partials/mangainfo.html'
			})
	}])
	.factory('Manga', ['$resource', function($http){
		return $http('https://www.mangaeden.com/api/list/0/?p=0&l=50') 
	}])
	.directive('dateago', ['$filter', function($filter){
		return {
			restrict : 'A',
			link : function(scope, element, attrs){ 
				var date = new Date(attrs.ts*1000); 
				element.text($filter('date')(date))
			}
		}
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
	}])
	.controller('LatestCtrl', ['$scope', function($scope){
		$scope.mangaList = $scope.latestManga;   
	}])
	.controller('InfoCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		$scope.mangaInfo = _.result(_.find($scope.allManga, { 'a': $routeParams.anchor }),'i');
		$scope.mangaDetails = []; 

		$http.get('https://www.mangaeden.com/api/manga/'+$scope.mangaInfo)
			.then(function(response){
				$scope.mangaDetails = response.data;  
			}, function(response){

			}) 
	}])







/*
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
.controller('LatestCtrl', ['$scope', function($scope){
	$scope.mangaList = $scope.latestManga;  
	$scope.$on('websiteReady', function(event, data){ 
		$scope.mangaList = $scope.latestManga;
	})
}])
*/