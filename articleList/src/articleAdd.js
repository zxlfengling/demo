/**
 * Created by zxl on 2018/8/9.
 */
app.controller('articleAdd',function($scope,$http,$state,typeName,typeIndustry){
    $scope.typeName=typeName;
    $scope.typeIndustry=typeIndustry;
    if($state.params.id){
        $scope.title="编辑Article";
        $scope.show=true;
        $http(
            {
                method:'GET',
                url:'/carrots-admin-ajax/a/article/'+$state.params.id,
            }).then(function successCallback(result){
                 $scope.article=result.data.data.article;
                //console.log($scope.article.type)
                $scope.selectedType=$scope.article.type;
            }, function errorCallback(data) {
                // 请求失败执行代码
            }
        )
    }else{
        $scope.title = "新增Article"
    }

    $scope.changeImg=function(){
        var file = document.getElementById("fileId").files[0];
        var fileImage=document.getElementById("fileImage");
        $('.imgName').text(file.name);
        $('.imgSize').text((file.size / 1024/1024).toFixed(2) + 'MB');
        $('.tab').show();
    }

    $scope.upload = function () {//上传图片
        $scope.show=false;
        $scope.expression=true;
        var pro = 0; //设置进度条的初始值
        var proBar = setInterval(Time, 10)
        function Time() {
            pro += 2;
            document.getElementById("progress").style.width = pro + '%';
            if (pro == 100) {
                clearInterval(proBar);
            }
        }
        var file = document.getElementById("fileId").files[0]
        var formData = new FormData();
        formData.append('file', file);
        $http(
            {
                method:'POST',
                url:'/carrots-admin-ajax/a/u/img/task',
                data:formData,
                headers: {'Content-Type': undefined},//使用angular上传一定要加上这一句，不然传给后台的是空的。
            }).then(function successCallback(result){
                console.log(result);
                $scope.urlImg=result.data.data.url;
                $scope.imgTxt = 'OK'
            }, function errorCallback(result) {
                // 请求失败执行代码
            }
        )
    }
    $scope.online=function(title,type,status,img,url,industry) {//编辑并更新一条数据
        if($state.params.id){
            $http(
                {
                    method:'PUT',
                    url:'/carrots-admin-ajax/a/u/article/'+$state.params.id,
                    params:{
                        title:title,
                        type:type,
                        status:status,
                        img:img,
                        url:url,
                        industry:industry,
                        createAt:new Date().getTime()
                    },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).then(function successCallback(result){
                    //$state.go('home.articleList',{},{reload:true});
                    console.log(result)
                }, function errorCallback(result) {
                    // 请求失败执行代码
                }
            )
        }else{
            $scope.online=function(title,type,status,url,industry){//添加一条数据
                $http(
                    {
                        method:'POST',
                        url:'/carrots-admin-ajax/a/u/article',
                        params:{
                            "title":title,
                            "type":type,
                            "url":url,
                            "status":status,
                            "industry":industry,
                            "img":$scope.urlImg
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded' },
                    }).then(function successCallback(result){
                        //console.log(result)
                        $state.go('home.articleList',{},{reload:true});
                    }, function errorCallback(result) {
                        // 请求失败执行代码
                    }
                )
            }
        }
    }
})