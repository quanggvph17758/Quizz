const app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/trangChu', {
            templateUrl: 'pages/trangChu.html',
        })

        .when('/gioiThieu', {
            templateUrl: 'pages/gioiThieu.html',
        })

        .when('/monHoc', {
            templateUrl: 'pages/monHoc.html',
        })

        .when('/hoiDap', {
            templateUrl: 'pages/hoiDap.html',
        })

        .when('/gopY', {
            templateUrl: 'pages/gopY.html',
        })

        .when('/lienHe', {
            templateUrl: 'pages/lienHe.html',
        })

        .when('/capNhatTK', {
            templateUrl: 'pages/capNhatTK.html',
        })

        .when('/doiMatKhau', {
            templateUrl: 'pages/doiMatKhau.html',
        })

        .when('/quenMatKhau', {
            templateUrl: 'pages/quenMatKhau.html',
        })

        .when('/dangKi', {
            templateUrl: 'pages/dangKi.html',
            controller: "myctrl",
        })

        .when('/dangNhap', {
            templateUrl: 'pages/dangNhap.html',
            controller: "myContrl",
        })

        .when('/quiz', {
            templateUrl: 'pages/quiz.html',
        })

        .when('/trangThi', {
            templateUrl: 'pages/trangThi.html',
        })

        .when('/quanLiND', {
            templateUrl: 'pages/quanLiND.html',
            controller: "myctrl",
        })
});

app.directive("quiz", function (quizFactory) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'trangThi.html',
        link: function (scope, elem, attr) {
            scope.start = function () {
                scope.id = 1;
                scope.thoiluong = 600;
                scope.quizOver = false; 
                scope.inProgess = true;
                scope.getQuestion();
                scope.timeout();
            };

            scope.reset = function () {
                scope.inProgess = false;
                scope.mark = 0;
            };

            scope.getQuestion = function () {
                var quiz = quizFactory.getQuestion(scope.id);
                if (quiz) {
                    scope.question = quiz.Text;
                    scope.options = quiz.Answers;
                    scope.answer = quiz.AnswerId;
                    scope.answerMode = true;
                } else {
                    scope.quizOver = true; 
                }
            };

            scope.checkAnswer = function () {
                if (!$('input[name = answer]:checked').length) return;
                var ans = $('input[name = answer]:checked').val();
                if (ans == scope.answer) {
                    // alert('Đúng');
                    scope.mark++;
                    scope.correctAns = true;
                } else {
                    // alert('Sai');
                    scope.correctAns = false;
                }
                scope.answerMode = false;
            };

            scope.nextQuestion = function () {
                scope.id++;
                scope.getQuestion();
            };

            scope.reset();
            scope.timeout = function () {
                scope.thoiluong--;
                if (scope.thoiluong != 0) {
                    scope.sophut = Math.floor(scope.thoiluong / 60);
                    scope.sogiay = scope.thoiluong % 60;
                    document.getElementById("sophut").innerHTML = scope.sophut;
                    document.getElementById("sogiay").innerHTML = scope.sogiay;
                    setTimeout(scope.timeout, 1000);
                } else {
                    scope.reset();
                    scope.xemlichsu = true;
                    scope.now = new Date();
                    scope.update_diem();
                }
            }
        }
    }
});

app.factory('quizFactory', function ($http) {
    $http.get('db/Quizs/ADAV.js').then(function (response) {
        questions = response.data;
    });
    return {
        getQuestion: function (id) {
            var randomItem = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if (count > 11) {
                count = 11;
            };
            if (id < 11) {
                return randomItem;
            } else {
                return false;
            }
        }
    }
});



