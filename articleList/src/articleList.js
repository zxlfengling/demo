/**
 * Created by zxl on 2018/8/1.
 */
//controller就是数据与视图相关联
app.controller('articleList',function($http,$scope,$state,$stateParams,typeName,typeStates){
// 获取传递的参数
       //类型
    //console.log(typeStates)
    //console.log($state)
    //$scope.params = $state.params;

    $('#dateStart').fdatepicker({format: 'yyyy-mm-dd',});
    $('#dateEnd').fdatepicker({format: 'yyyy-mm-dd',});
    $scope.params=$state.params;//接收路由传递的参数
    console.log($state.params)
    $scope.typeName = typeName;//类型
    $scope.typeStates=typeStates//状态

     $scope.startAt=$stateParams.startAt;
    //console.log($scope.startAt)
     $scope.endAt=$stateParams.endAt;
    //
    $stateParams.startAt =($scope.startAt)? (Date.parse($scope.startAt) + (0 * 60 * 60 * 1000)):"";
    $stateParams.endAt = ($scope.endAt)? ( Date.parse($scope.endAt) + ( 24 * 60 * 60 * 1000)):"";

    //获取数据
        $http(
            {
                method:'GET',
                url:'/carrots-admin-ajax/a/article/search',
                params:$scope.params,
            }).then(function successCallback(data){
                //console.log(data)
                //console.log(Math.ceil(data.data.data.total/10))
                //$scope.total=Math.ceil(data.data.data.total/10);
                $scope.list=data.data.data.articleList;
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

    $scope.search = function(start,end,types,states,industry) {
        $state.go(
            "home.articleList",
            {
                startAt:start,
                endAt:end,
                type:types,
                status:states,
                //pageid:1
            },
            { reload: true }
        );
    };

    $scope.option = {
        curr: 1,  //当前页数
        all: 20,  //总页数
        count: 5,  //最多显示的页数，默认为10
        //点击页数的回调函数，参数page为点击的页数
        click: function (page) {
            //console.log(page);
            $state.go(
                "home.articleList",
                {
                    page:page,
                }
            );
            //这里可以写跳转到某个页面等...
        }
    }
})


