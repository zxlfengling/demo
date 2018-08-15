angular
    .module('myApp')
    // $state.go()用于页面的跳转路由跳转的三种方式之一
    .controller('loginCtrl', function($scope, $http, $state) {
        // 需要个click事件
        $scope.login = function() {
            // 不要去获取节点
            // $scope.name = { name: "name" }
            // 从js到html的过程是设置对象,而从html到js的过程是设置对象的属性
            // 此时也就设置了对象
            console.log($scope.user);

            $http({
                method: 'POST',
                url: 'carrots-admin-ajax/a/login',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                // 类似原生序列化的方法,
                // data: ('name=' +
                //     'admin' +
                //     '&pwd=' +
                //     '123456')
                // 类似jQuery的params的方法            
                // params: { name: 'admin', pwd: '123456' },
                // 这种写法也是可以的
                params: $scope.user //序列化一个对象
                
            }).then(function successCallback(response) {
                    // then(f1(成功),f2(失败))
                    // 函数里面的参数就是整个请求回来的对象
                    console.log("请求成功,数据传输成功");
                    console.log(response.data);                  
                    switch (response.data.code) {
                        case 0:
                            $state.go('home.welcoom',{ reload: true });
                            break;
                        case -5003:
                            $scope.tips = "用户不存在";
                            break;
                        case -5004:
                            $scope.tips = "密码错误";
                            break;
                    }
                },
                function errorCallback(response) {
                    console.log(123)
                    $scope.tips = "请求服务器失败, 请重试!";
                })
        }
    })
