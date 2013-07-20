"use strict";

/* Services */

angular.module("screenShot.services", [])
    .value("localStorage", window.localStorage)
    .value("loadingImage", "/images/gif-load.gif")
    .value("ext", ".png")
    .factory("defaultVal", function(localStorage){
        var defaultVal = JSON.parse(localStorage.getItem("screenShot"));
        defaultVal = defaultVal ? defaultVal : {
            url:"",
            ua:"PC",
            pieces:1,
            width:800,
            height:600
        };

        defaultVal.setValue = function(scope){
            localStorage.setItem("screenShot", JSON.stringify({
                url:scope.url,
                ua:scope.ua,
                pieces:scope.pieces,
                width:scope.width,
                height:scope.height
            }));
        };

        return defaultVal;
    })
    .service("loadImgService", function($http, loadingImage, ext){
        this.loadimg = function(url, img, filename){
            return $http({
                method:"GET",
                url:url
            }).success(function(data, status, headers, config){
                img.src = filename;
            });
        };

        this.loadimgs = function(scope){
            scope.images.length = 0;
            var num = scope.pieces;
            var params = [];
            var path = "/screenshot/" + $($.parseHTML("<a>")).prop("href", scope.url).prop("hostname");
            for (var i = 0; i < num; i++) {
                var now = Date.now();
                params[i] = [
                    "url=" + scope.url,
                    "ua=" + scope.ua,
                    "viewW=" + scope.width,
                    "viewH=" + 0,
                    "topH=" + scope.height*i,
                    "leftW=" + 0,
                    "clipW=" + scope.width,
                    "clipH=" + scope.height,
                    "delay=" + scope.delay,
                    "time=" + now
                ];
                scope.images[i] = {src:loadingImage};
                var filename = path + "_" + now + ext;
                this.loadimg("/image?" + params[i].join("&"), scope.images[i], filename);
            }
        };
    });