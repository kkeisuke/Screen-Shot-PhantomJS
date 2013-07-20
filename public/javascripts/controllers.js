"use strict";

/* Controllers */

angular.module("screenShot.controllers", [])
.controller("Main", function($scope, localStorage, defaultVal, loadImgService){
    $scope.url = defaultVal.url;
    $scope.ua = defaultVal.ua;
    $scope.pieces = defaultVal.pieces;
    $scope.width = defaultVal.width;
    $scope.height = defaultVal.height;
    $scope.images = [{"src":""}];
    $scope.delay = 0;
    $scope.submit = function(){
        defaultVal.setValue(this);
        loadImgService.loadimgs(this);
    };
});