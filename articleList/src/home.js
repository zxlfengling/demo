/**
 * Created by zxl on 2018/8/1.
 */
app.controller('home',function($scope){
    $scope.myList=true;
    $scope.toggle=function(){
        $scope.myList=!$scope.myList
    }
})
