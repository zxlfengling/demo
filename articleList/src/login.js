/**
 * Created by zxl on 2018/7/23.
 */
app.controller('login',['$scope','$http','$state',function($scope,$http,$state){
    //控制器是AngularJS的核心之一，
    // 它的作用主要是对视图中的数据和事件处理函数进行挂载，(处理业务逻辑)
    // 同时进行一定的业务功能的底层封装和处理。（封装处理）
    //控制器怎么用？
    // 模块下挂载控制器→控制器的作用范围仅限于当前模块→局部控制器
        $scope.regText={
            regVal:" ",
            regList:[
                {name:'required',tips:'请输入用户名'},
                {name:'required01',tips:'请输入密码'},
                {name:'pattern',tips:'用户名必须是字母'},
                {name:'minlength01',tips:'密码必须是6位以上'},
            ],
            fn:function(err,err1){
                console.log(err)
                console.log(err1)
                for(var attr in err){
                    if(err[attr]==true){
                        this.regVal=attr;
                        return
                    }
                }
                for(var attr1 in err1){
                    if(err1[attr1]==true){
                        this.regVal=attr1+"01";
                        return
                    }
                }
                var names=$scope.name;
                var pwds=$scope.pwd;
                $http(
                    {
                        method:'POST',
                        url:'/carrots-admin-ajax/a/login',
                        data:{
                            'name':names,
                            'pwd':pwds
                        },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function(obj) {
                            var str = [];
                            for (var p in obj) {
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            }
                            return str.join("&");
                        }

                    }).then(function successCallback(data){
                        console.log(data)
                        if(data.data.code==0){
                            $state.go('home', { reload: true });//跳转没有更新需要加上 reload: true
                        }else{

                        }

                    }, function errorCallback(data) {
                        // 请求失败执行代码
                    }
                )
            }
        }
}])