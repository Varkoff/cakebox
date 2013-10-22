app.controller('MainCtrl', ['$scope', '$http', '$routeParams', 'breadcrumbs',
    function($scope, $http, $routeParams, breadcrumbs) {

        $scope.getDone = false;
        $scope.currentPath = "";
        $scope.breadcrumbs = breadcrumbs;

        if (angular.isUndefined($routeParams.path))
        {
            $routeParams.path = "";
            $http.get('/api/directories/').success(function(data) {
                $scope.dirs = data;
            });
        }

        $scope.$watch('location.path()', function(event, current) {

            if ($routeParams.path)
                $scope.currentPath += $routeParams.path + '/';

            $http.get('/api/directories/' + $scope.currentPath).success(function(data) {
                $scope.dirs = data;
                $scope.getDone = true;
            });
        });
    }
]);