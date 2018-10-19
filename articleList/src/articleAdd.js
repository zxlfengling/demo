/**
 * Created by zxl on 2018/8/9.
 */
app.controller('articleAdd',function($scope,$http,$state,typeName,typeIndustry){
    $scope.typeName=typeName;//类型
    $scope.typeIndustry=typeIndustry;//行业大图
    $scope.delete=true;

    //$scope.fn=function(){
    //    alert(1)
    //}

    //数据模型，用来保存页面要保存的数据
    //视图用来显示数据的
    //控制器，用来控制业务的逻辑,负责处理数据，数据的获取，数据的过滤
    if($state.params.id){//把要编辑的内容显示出来
        $scope.title="编辑Article";
        //$scope.show=true;
        $http(
            {
                method:'GET',
                url:'/carrots-admin-ajax/a/article/'+$state.params.id,
            }).then(function successCallback(result){
                 $scope.article=result.data.data.article;
                $scope.imgs=result.data.data.article.img;
                //console.log($scope.article)
                $scope.selectedType=$scope.article.type;
                editor.txt.html($scope.article.content)
            }, function errorCallback(data) {
                // 请求失败执行代码
            }
        )
    }else{
        $scope.title = "新增Article";
    }


    $scope.changeImg=function(){//读取文件信息
        var file = document.getElementById("fileId").files[0];
        //console.log(file)
        //var fileImage=document.getElementById("fileImage");
        $('.imgName').text(file.name);
        $('.imgSize').text((file.size / 1024/1024).toFixed(2) + 'MB');
        $('.tab').show();
    }

    $scope.upload = function () {//上传图片
        $scope.expression=true;
        $scope.delete=false;
        var pro = 0; //设置进度条的初始值
        var proBar = setInterval(Time, 10)
        function Time() {
            pro += 2;
            document.getElementById("progress").style.width = pro + '%';
            if (pro == 100) {
                clearInterval(proBar);
            }
        }
        var file = document.getElementById("fileId").files[0];
            //绝对路径
        var reader = new FileReader();//读取文件图片的方法
        reader.readAsDataURL(file)//把文件读取成dataUrl找到图片的路径
        reader.onload = function(e){
            var data = e.target.result;
            //console.log(data)
            $scope.imgs=data;//路径解析成base64
        }
       // console.log() ;//读取图片地址

        var formData = new FormData();
        formData.append('file', file);

        $http(
            {
                method:'POST',
                url:'/carrots-admin-ajax/a/u/img/task',
                data:formData,
                headers: {'Content-Type': undefined},//使用angular上传一定要加上这一句，不然传给后台的是空的。
            }).then(function successCallback(result){
                //console.log(result);
                $scope.urlImg=result.data.data.url;
                //console.log($scope.urlImg)
                $scope.imgTxt = 'OK'
            }, function errorCallback(result) {
                // 请求失败执行代码
            }
        )
    }

    $scope.deleteUpload=function(){
        $scope.expression=false;
        $scope.delete=true;
        var pro = 100; //设置进度条的初始值
        var proBar = setInterval(Time, 10)
        function Time() {
            pro -= 2;
            document.getElementById("progress").style.width = pro + '%';
            if (pro == 0) {
                clearInterval(proBar);
            }
        }
    }

    $scope.online=function(title,type,status,url,img,industry) {//编辑并更新一条数据
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
                    $state.go('home.articleList',{},{reload:true});
                    //console.log(result)
                }, function errorCallback(result) {
                    // 请求失败执行代码
                }
            )
        }else{
            $scope.online=function(title,type,status,url,industry){//添加一条数据
                console.log(title)
                console.log(type)
                console.log(status)
                console.log(url)
                console.log($scope.urlImg)
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
                       // console.log(result)
                        $state.go('home.articleList',{},{reload:true});
                    }, function errorCallback(result) {
                        // 请求失败执行代码
                    }
                )
            }
        }
    }

    $scope.cancel=function(){
        $http(
            {
                method:'POST',
                url:'/carrots-admin-ajax/a/logout',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(result){
                console.log(result)
                $state.go('home.articleAdd',{},{reload:true});
            }, function errorCallback(result) {
                // 请求失败执行代码
            }
        )
    }

    //配置wangEditor富文本
    var E, editor;
    E = window.wangEditor;
    editor = new E('#editor'); //id一定要一致
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo'  // 撤销
    ];
    //如果需要使用 base64 编码直接将图片插入到内容中，可参考一下示例配置
    editor.customConfig.uploadImgShowBase64 = true;
    // 将图片大小限制为 10M
    editor.customConfig.uploadImgMaxSize = 10* 1024 * 1024;
    editor.create();
    //获取内容的方式
    //$scope.getContent = function(){
    //    alert(editor.txt.html())
    //}
    //$scope.getContent2 = function(){
    //    alert(editor.txt.text())
    //}


})