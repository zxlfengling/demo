/**
 * Created by zxl on 2018/8/9.
 */
app.controller('articleAdd',function($scope,$http,$state,typeName,typeIndustry){
    $scope.typeName=typeName;
    $scope.typeIndustry=typeIndustry;
    $scope.changeImg=function(){
        var file = document.getElementById("fileId").files[0];
        var fileImage=document.getElementById("fileImage");
        $('.imgName').text(file.name);
        $('.imgSize').text((file.size / 1024/1024).toFixed(2) + 'MB');
        $('.tab').show();

        $scope.reader = new FileReader(); //创建一个FileReader接口
        $scope.reader.readAsDataURL(file);//读取文件
        $scope.reader.onload=function(e){
            $scope.data=e.target.result;
            fileImage.style.background = 'url('+$scope.data+')';
        }
    }

    $scope.upload = function () {
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

        $scope.online=function(title,type,status,url,industry){
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
                    console.log(result)
                    $state.go('home.articleList',{},{reload:true});
                }, function errorCallback(result) {
                    // 请求失败执行代码
                }
            )
    }









    //$scope.online=function(name,type,url,industry){
    //
    //}
    //$http({
    //    method:'post',
    //    url:'/carrots-admin-ajax/a/u/article',
    //    params:$scope.params,
    //    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //}).then(function successCallback(data){
    //
    //}, function errorCallback(data) {
    //    // 请求失败执行代码
    //})
})