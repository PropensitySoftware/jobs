var sim = angular.module("sim", []);

sim.controller("AppCtrl", ['$http', function($http) {
    var app = this;
    var url = "http://localhost:3000/svc";

    app.saveResource = function(newResource) {
        $http.post(url + "/add", {name:newResource}).success(function() {
            loadResources();
        });
    };

    function loadResources() {
        $http.get(url).success(function(resources) {
            app.resources = resources;
        });
    }

    loadResources();



}]);
