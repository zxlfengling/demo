angular
    .module("myApp")
    .controller('homeCtrl', function($scope) {
        $scope.clicked = function() {
            if ($scope.checked == true) {
                $scope.checked = !true;
            } else {
                $scope.checked = true;
                $scope.checked2 = false;
            }
        }
        $scope.clicked2 = function() {
            if ($scope.checked2 == true) {
                $scope.checked2 = !true;
            } else {
                $scope.checked2 = true;
                $scope.checked = false;
            }
        }
    });