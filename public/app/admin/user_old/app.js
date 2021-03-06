/**
 * Created by chaow on 4/7/2015.
 */

var app = angular.module('UserAdmin', ['ui.router','ngCookies',
    'AppConfig','angularify.semantic', 'flow', 'User', 'UserType']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "/app/admin/user/_home.html",
            controller: "HomeCtrl",
            resolve: {
                users: function (UserService) {
                    return UserService.all();
                }
            }
        })
        .state('add', {
            url: "/add",
            templateUrl: "/app/admin/user/_add.html",
            controller: "AddCtrl",
            resolve: {
                user: function (UserService) {
                    return {data: {}}
                },
                userTypes: function (UserTypeService) {
                    return UserTypeService.all();
                }
            }
        })
        .state('edit', {
            url: "/edit/:id",
            templateUrl: "/app/admin/user/_edit.html",
            controller: "EditCtrl",
            resolve: {
                user: function (UserService, $stateParams) {
                    return UserService.edit($stateParams.id)
                },
                userTypes: function (UserTypeService) {
                    return UserTypeService.all();
                }
            }
        })
});

app.controller("HomeCtrl", function ($scope, $state, users, UserService) {
    console.log("HomeCtrl Start...");

    $scope.users = users.data;
    $scope.user = {};
    $scope.delete_modal = false;

    $scope.showDeleteModal = function (user) {
        $scope.user = user;
        $scope.delete_modal = true;
    }

    $scope.closeDeleteModal = function () {
        $scope.delete_modal = false;
    }

    $scope.ajaxDelete = function (user, bool) {
        $scope.user = user;
        if (bool) {
            UserService.delete(user).success(function (response) {
                $scope.closeDeleteModal();
                UserService.all().success(function (response) {
                    $scope.users = response;
                })
            });
        } else {
            $scope.closeDeleteModal();
        }

    }
});

app.controller("AddCtrl", function ($scope, $state, user, UserService, userTypes) {
    console.log("AddCtrl Start...");

    $scope.user = user.data;
    $scope.userTypes = userTypes.data;

    $scope.user.user_type = $scope.userTypes[4];

            console.log($scope.userTypes);

            $scope.save = function () {
                UserService.store($scope.user).success(function (resposne) {
                    $state.go('home');
                    //$state.go("edit",{id:resposne.id});
                }).error(function (response) {
                    $scope.message = response;
        });
    }
});

app.controller("EditCtrl", function ($scope, $state, user, UserService,userTypes,$cookieStore,$cookies) {
    console.log("EditCtrl Start...");

    var cookies = $cookies['XSRF-TOKEN'];


    $scope.user = user.data;
    $scope.userTypes = userTypes.data;

    var setUserType = function(){
        for(i=0;i<$scope.userTypes.length;i++){
            if ($scope.user.user_type.key == $scope.userTypes[i].key){
                $scope.user.user_type = $scope.userTypes[i];
                break;
            }
        }
    }

    setUserType();


    $scope.upload = {};
    $scope.upload.myFlow = new Flow({
        target: '/api/user/' + $scope.user.id + '/logo',
        singleFile: true,
        method: 'post',
        testChunks: false,
        headers: function (file, chunk, isTest) {
            return {
                'X-XSRF-TOKEN': cookies// call func for getting a cookie
            }
        }
    })


    $scope.upload.uploadFile = function () {
        $scope.upload.myFlow.upload();
    }

    $scope.upload.cancelFile = function (file) {
        var index = $scope.upload.myFlow.files.indexOf(file)
        $scope.upload.myFlow.files.splice(index, 1);

    }


    $scope.save = function () {
        UserService.save($scope.user).success(function (resposne) {
            $state.go("home")
        }).error(function (response) {
            $scope.message = response;
        });
    }
});