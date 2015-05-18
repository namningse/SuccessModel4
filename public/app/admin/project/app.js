/**
 * Created by chaow on 4/7/2015.
 */

var app = angular.module('ProjectAdmin', ['ui.router','AppConfig','angularify.semantic', 'flow','Faculty', 'Project','ProjectStatus']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/app/admin/project/_home.html",
            controller: "HomeCtrl",
            resolve: {
                faculties: function (ProjectService) {
                    return ProjectService.all();
                }
            }
        })
        .state('add', {
            url: "/add",
            templateUrl: "/app/admin/project/_add.html",
            controller: "AddCtrl",
            resolve: {
                project: function (ProjectService) {
                    return {data: {}}
                },
                statuses : function(ProjectStatusService){
                    return ProjectStatusService.all();
                },
                faculties : function(FacultyService){
                    return FacultyService.all();
                }
            }
        })
        .state('edit', {
            url: "/edit/:id",
            templateUrl: "/app/admin/project/_edit.html",
            controller: "EditCtrl",
            resolve: {
                project: function (ProjectService, $stateParams) {
                    return ProjectService.edit($stateParams.id)
                },
                statuses : function(ProjectStatusService){
                    return ProjectStatusService.all();
                },
                faculties : function(FacultyService){
                    return FacultyService.all();
                }
            }
        })
});

app.controller("HomeCtrl", function ($scope, $state, faculties, ProjectService) {
    console.log("HomeCtrl Start...");

    $scope.faculties = faculties.data;
    $scope.project = {};
    $scope.delete_modal = false;

    $scope.showDeleteModal = function (project) {
        $scope.project = project;
        $scope.delete_modal = true;
    }

    $scope.closeDeleteModal = function () {
        $scope.delete_modal = false;
    }

    $scope.ajaxDelete = function (project, bool) {
        $scope.project = project;
        if (bool) {
            ProjectService.delete(project).success(function (response) {
                $scope.closeDeleteModal();
                ProjectService.all().success(function (response) {
                    $scope.faculties = response;
                })
            });
        } else {
            $scope.closeDeleteModal();
        }

    }
});

app.controller("AddCtrl", function ($scope, $state, project,statuses, ProjectService) {
    console.log("AddCtrl Start...");

    $scope.project = project.data;

    $scope.save = function () {
        ProjectService.store($scope.project).success(function (resposne) {
            $state.go('home');
            //$state.go("edit",{id:resposne.id});
        }).error(function (response) {
            alert(response.name_th);
        });
    }

    $scope.statuses = statuses.data;

    $scope.updateStatus = function(status){
        $scope.project.status = status;
    }
    $('.ui.dropdown').dropdown();
});

app.controller("EditCtrl", function ($scope, $state, project, ProjectService,statuses,faculties) {
    console.log("EditCtrl Start...");

    $scope.project = project.data;
    $scope.statuses = statuses.data;
    $scope.faculties = faculties.data;

    $scope.myFlow = new Flow({
        target: '/api/project/'+$scope.project.id+'/logo',
        singleFile: true,
        method : 'post',
        testChunks : false,
        headers: function (file, chunk, isTest) {
            return {
                'X-CSRFToken': cookie.get("csrftoken")// call func for getting a cookie
            }
        }
    })


    $scope.uploadFile = function(){
        $scope.myFlow.upload();
    }

    $scope.cancelFile = function (file){
        var index = $scope.myFlow.files.indexOf(file)
        $scope.myFlow.files.splice(index,1);

    }

    $scope.save = function () {
        ProjectService.save($scope.project).success(function (resposne) {
            $state.go("home")
        }).error(function (response) {
            alert(response.name_th);
        });
    }

    $scope.updateStatus = function(status){
        $scope.project.status = status;
    }

    $scope.updateFaculty = function(faculty){
        $scope.project.faculty = faculty;
    }

    $('.menu .item').tab();
    $('.ui.dropdown').dropdown();

});