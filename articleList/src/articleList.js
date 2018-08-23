/**
 * Created by zxl on 2018/8/1.
 */
//controller就是数据与视图相关联
//指令 新的语法 在dom上做的标记，附加特定的行为，命令型，以命令的口吻去叫什么去执行什么
app.controller('articleList',function($http,$scope,$state,$stateParams,typeName,typeStates){
//controller控制器控制控制应用程序
//    控制器是AngularJS的核心之一，
//    它的作用主要是对视图中的数据和事件处理函数进行挂载，
//    同时进行一定的业务功能的底层封装和处理。
    //ng-controller指定应用程序控制器
    //控制器的作用
    //1、通过$scope进行数据状态的初始化操作
    //2、通过$scope进行事件处理函数的挂载操作
    //4、不同控制器之间的数据共享：使用Angular中的自定义服务Service进行处理

// 获取传递的参数
     //angular服务是控制器的对象，都是为数据服务的，具有生命周期，重载或者刷新时，数据不会被清除
    //与加载之前保持一致
    //为实现的功能提供数据和对象，分为内置服务，和自定义服务
    //内置服务$scope,$state，$stateParams
    //自定义服务分为两种，一种是使用内置服务，另外一种是模块的注册方法factory、
    // service、constant和value等方法
    //factory工厂模式都是接收两个参数，一个是服务的名字，一个是服务的返回值
    //service与工厂模式差不多，只不过，service可以提供构造函数
    //provider这个方法可以做供应商config配置
    console.log($stateParams.page)

    if($state.params.type==undefined){//对接受的参数进行判断，如果是undefined,我就赋值undefiend
        $state.params.type=undefined;
    }else{
        $scope.selectedType=parseInt($state.params.type);//这个是我选择类型就显示哪个类型
    }
    if($state.params.status==undefined){
        $state.params.status=undefined;
    }else{
        $scope.selectedStatus =parseInt($state.params.status);//这个是我选择状态就显示哪个状态
        //$state.params是基于非URL的状态
    }
    $('#dateStart').fdatepicker({format: 'yyyy-mm-dd',});//日历插件
    $('#dateEnd').fdatepicker({format: 'yyyy-mm-dd',});
    $scope.typeName = typeName;//类型
    $scope.typeStates=typeStates//状态

    $scope.params=$state.params;//$state.params表示接收路由的传过来的参数
    console.log($state.params)

     $scope.startAt=$state.params.startAt;//$stateParams接收url的参数
    //console.log($scope.startAt)
     $scope.endAt=$state.params.endAt;
    //
    $state.params.startAt =($scope.startAt)? (Date.parse($scope.startAt) + (0 * 60 * 60 * 1000)):"";
    $state.params.endAt = ($scope.endAt)? ( Date.parse($scope.endAt) + ( 24 * 60 * 60 * 1000)):"";

    //获取数据
        $http(//用于读取远程的数据
            {
                method:'GET',//请求的方式
                url:'/carrots-admin-ajax/a/article/search',//请求的地址
                params:$scope.params,
            }).then(function successCallback(data){
                //console.log(data)//请求成功后返回的数据
                //console.log(Math.ceil(data.data.data.total/10))
                //$scope.total=Math.ceil(data.data.data.total/10);
                $scope.list=data.data.data.articleList;
                console.log()
            }, function errorCallback(data) {
                // 请求失败执行代码
            }
        )
    //上线、下线更新一条数据
    $scope.fn=function(id,status){
        if(status==1){
            status=2
        }else{
            status=1
        }
        $http(
            {
                method:'PUT',
                url:'/carrots-admin-ajax/a/u/article/status',
                params:{
                    'id':id,
                    'status':status
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            }).then(function successCallback(data){
                //console.log(data)
                if(data.data.code==0){
                    $state.go("home.articleList", {}, { reload: true });
                }
            }, function errorCallback(data) {
                // 请求失败执行代码
            }
        )
    }

    //删除一条数据
    $scope.delete=function(id){
        $http(
            {
                method:'DELETE',
                url:'/carrots-admin-ajax/a/u/article/'+id,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            }).then(function successCallback(data){
               console.log(data.data.code)
                if(data) {
                    $state.go("home.articleList", {}, { reload: true });
                }
            }, function errorCallback(data) {
                // 请求失败执行代码
            }
        )
    }

    $scope.search = function(start,end,types,states,page) {
        console.log(page)
        $state.go(//$state是跟路由搭配使用的一个方法，$state.go就是路由的跳转，也就是路由从一种状态到另外
            //的一种状态，提供三个参数，第一个参数数是你要跳转的状态，第二个是你要传递的参数，reload为true表示会重载
            //
            "home.articleList",
            {
                startAt:start,
                endAt:end,
                type:types,
                status:states,
            },
            { reload: true }//表示重新更新数据,重新从后台获取数据，重新载入我要查询那条数据
        );
    };

    $scope.option = {
        curr: 1,  //当前页数
        all: 20,  //总页数
        count: 9,  //最多显示的页数，默认为10
        //点击页数的回调函数，参数page为点击的页数
        click: function (page) {
            $scope.page=page;
            $state.go(
                "home.articleList",
                {
                    page:page,
                }
            );
            //console.log(page);
            //这里可以写跳转到某个页面等...
        }
    }

    //获得单个articles数据
    $scope.editor=function(editorId){
        //console.log(editorId)
        $state.go("home.articleAdd", {id:editorId}, { reload: true });
    }
})


