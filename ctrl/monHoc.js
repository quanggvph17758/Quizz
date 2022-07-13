app.controller("monHoc_Ctrl", function ($scope, $http) {
    const api = 'https://6213cf6b89fad53b1f022c51.mockapi.io/Subjects';

    $http.get(api)
        .then(function (response) {
            $scope.subjects = response.data;
        });

});