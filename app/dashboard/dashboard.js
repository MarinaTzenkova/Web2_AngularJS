'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ui.calendar'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', [ '$scope', 'myTasks', 'myEmployees', 'departmentService', 'uiCalendarConfig', function($scope, myTasks, myEmployees, departmentService, uiCalendarConfig) {

  $scope.tasks = myTasks.data;
	$scope.employees = myEmployees.data;
	//$scope.departments = myDepartments.data;
	
	
		departmentService.getDepartments()
		.then(function(response){
		$scope.departments = response.data;
		},function(error){
		$scope.error = error;
		}); 
	
  $scope.eventSources = [$scope.tasks];

	$scope.TaskVisible = false;
	$scope.EmployeeVisible = false;
	$scope.DepartmentVisible = false;

	$scope.ShowTaskInfo = function(task) {
		var myEl = angular.element(document.querySelector('#showTask'));
		$scope.TaskVisible = true;
		myEl.html("Task info -> Number: " + task.number + " | Description: " + task.title + " | Completed: " + task.completed + " | Start date: " + task.start.toString() + " | End date: " + task.end.toString());
	};

	$scope.ShowEmployeeInfo = function(employee) {
		var myEl = angular.element(document.querySelector('#showEmployee'));
		$scope.EmployeeVisible = true;
		myEl.html("Employee info -> Name: " + employee.Name + " | Occupation: " + employee.Occupation + " | State: " + employee.State);
	};

	$scope.ShowDepartmentInfo = function(department) {
		var myEl = angular.element(document.querySelector('#showDepartment'));
		$scope.DepartmentVisible = true;
		myEl.html("Department info -> Id: " + department.no + " | Name: " + department.name + " | Code: " + department.code);
	};
}]);
