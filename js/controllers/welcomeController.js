'use strict';

loginApp.controller('WelcomeController', ['$scope', '$http', '$cookies', 'userFactory', 'profileFactory', 'loggedInFactory', 'setMembersFactory', function($scope, $http, $cookies, userFactory, profileFactory, loggedInFactory, setMembersFactory){
  
	$scope.showPage = loggedInFactory.getLoginStatus(); // If $scope.showPage = true the page is shown, if false it's not.	
	
	var cookie = angular.fromJson($cookies.userInfoCookie); // Setting the logged in userInfo cookie to $scope.cookie
	userFactory.setUser(cookie); // Using $scope.cookie, to set the logged in user in the userFactory.

	// Loading indicators.
	$scope.$on('LOADING', function(){$scope.loading = true}); // If $scope.loading is true/LOADING the loader will show.
	$scope.$on('LOADED', function(){$scope.loading = false}); // If $scope.loading is false/LOADED the loader will show.
	
	$scope.$emit('LOADING'); // Emit LOADING, sets $scope.loading to true. Shows loading indicator.
	
	$http({ 	
	    method: 'GET',
	    url: 'https://localhost:3000/accountResources/users'
	}).success(function(data) {
	    setMembersFactory.setMembs(data);
	    $scope.members = setMembersFactory.getMembs();
	    console.log('success from Welcome');
	    $scope.$emit('LOADED'); // Emit LOADED, sets $scope.loading to false. Hides loading indicator
	}).error(function(error, status) { 
	    console.log(error, status, 'error. Welcome.');
	});
	
	// Function called when user clicks a member in the welcome view.
	$scope.clickedMember = function(member){
		profileFactory.setChosenMemb(member); // Passing the clicked member to the profile factory for the chosen member.
	};
	
	$scope.sortField = 'username'; // ng-click sets a different string to $scope.sortField to filter the list with orderBy
	
	$scope.reverse = false; // ng-click filters the list form A-Z and Z-A aplhabetically.
	
}]);