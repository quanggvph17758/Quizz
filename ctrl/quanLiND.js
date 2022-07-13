app.controller("myctrl", function ($scope, $http) {
    const api = 'https://6213cf6b89fad53b1f022c51.mockapi.io/Students';

    $http.get(api)
        .then(function (response) {
            $scope.students = response.data;
        })

    $scope.onSubmitForm = function (event) {
        event.preventDefault();

        $http.post(api, $scope.student)
            .then(function (response) {
                console.log(response);
            })
    }

    $scope.update = function () {
        $http.put(api + '/' + $scope.id, $scope.student)
            .then(function (response) {
                console.log(response);
            })
    }
    
    $scope.cellclick = function (id) {
        $scope.id = id;
        for (var i = 0; i < $scope.students.length; i++) {
            if ($scope.students[i].id == $scope.id) {
                $scope.student = angular.copy($scope.students[i]);
            }
        }
    }
    $scope.onDelete = function () {
        $http.delete(api + '/' + $scope.id)
            .then(function (response) {
                console.log(response);
            })
        $scope.clear();
    }
    $scope.clear = function () {
        $scope.student = {};
    }
});