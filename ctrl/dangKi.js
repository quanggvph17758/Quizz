app.controller("myctrl", function ($scope, $http) {
    const api = 'https://6213cf6b89fad53b1f022c51.mockapi.io/Students';

    $http.get(api) // Gửi 1 request tới API với method: GET
        .then(function (response) {
            $scope.students = response.data;
        })

    $scope.onSubmitForm = function (event) {
        event.preventDefault();
        $http.post(api, $scope.student)
            .then(function (response) {
                console.log(response);
            });
    }
});