app.controller('myContrl', function ($scope, $http, $rootScope) {
    $scope.login = function () {
      const api = 'https://6213cf6b89fad53b1f022c51.mockapi.io/Students';
      $http.get(api) // Gửi 1 request tới API với method: GET
        .then(function (response) {
          console.log(response);
          $rootScope.students = response.data;
        })
      var lg = true;
      $rootScope.students.forEach(st => {
        if (st.username == $scope.username) {
          if (st.password == $scope.password) {
            $rootScope.indexStudent = st.index;
            $rootScope.student = st;
            lg = false;
            return;
          };
        };
      });
      if (lg == true) {
        alert('Đăng nhập thất bại');
      } else {
        alert('Đăng nhập thành công');
        window.location.href = "#monHoc";
      }
    };
  
  });