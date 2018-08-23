angular.module("myApp")
.controller("newListpage",function($scope,$http,$state,$stateParams,types,industries,FileUploader) {
        //console.log(FileUploader)
    editor = new wangEditor("#explain");
    editor.create();
    // 富文本框插入完毕
    //    console.log($scope.article)
    $scope.types = types;   
    $scope.industries = industries;
    // console.log($scope.industries);
    console.log($state.params.id)
    //console.log($scope)
    if($state.params.id) {
        $scope.title = "编辑Article"
        // console.log('编辑数据传输成功')
        $http({
            method:'GET',
            url:'/carrots-admin-ajax/a/article/'+$stateParams.id
        }).then(function successCallback(response){
            console.log(response);
            if(response.data.code===0) {
                // console.log($scope.article)article未挂载,需重新挂载
                $scope.article = response.data.data.article;                
                // console.log($scope.article);获取单个article信息
                $scope.article.type=String($scope.article.type);         
                $scope.article.industries=String($scope.article.industry);
                // editor.txt.clear()清空
                // editor.txt.append('<p>我是新的</p>')               
                editor.txt.html($scope.article.content)//显示说明内容
                // 一下三个可和一,为了理解scope隔离域我将其拆分了
                $scope.imgUrl = $scope.article.img;
                $scope.xxUrl =  $scope.article.img;
                $scope.myimgUrl = $scope.article.img;
                
                // console.log($scope.article.type);
                // console.log($scope.type);
                console.log(response.data.data.article.img)
                console.log($scope.imgUrl)
            };
        });
    } else {
        $scope.title = "新增Article"
        $scope.imgUrl = "../img/timg2.png"
    };
    
    //上传功能逻辑,两个按钮传参显示是存为上线还是草稿在状态
    // x是上线状态

$scope.upLoad = function(x) {
    // console.log(x)
    // console.log($scope.article.title);
    // console.log($scope.article.type);
    // console.log($scope.article.industries);
    // console.log($scope.article.url);
    // console.log($scope.imgUrl);
    // console.log(x)    
    $scope.article.status = x ;//状态
    $scope.article.content = editor.txt.html(); //富文本
    $scope.article.industry =($scope.article.type==3)?$scope.article.industries:'';//行业
    $scope.article.img=$scope.myimgUrl;
   //图片地址接受新传的地址,放到article对象img属性中
    // console.log($scope.article)   
    if($state.params.id){
        $http({
            method:'PUT',
            url:'/carrots-admin-ajax/a/u/article/' + $state.params.id,
            headers:{"Content-Type": "application/x-www-form-urlencoded"},         
            params:$scope.article
        }).then(function successCallback(response){
            if(response.data.code==0) {                
                // console.log('编辑成功');
                // 传参判断是否上线或草稿
                if(x==1) {
                    alert("编辑成功");
                } else {
                    alert("存为草稿");
                };
                $state.go('home.listpages',{},{reload:true});
            } else {
                alert("传说中的迷之错误")
            };           
        });
    } else {
        // 新增Article      
        $http({
            method: "POST",
            url:"/carrots-admin-ajax/a/u/article",
            params: $scope.article,
            header:{"Content-Type": "application/x-www-form-urlencoded"}
        }).then(function successCallback(response) {
            //console.log($scope.article.img)
            console.log(response)
            if(response.data.code===0) {
                if(x==1) {
                    alert("新增成功");
                } else {
                    alert("存为草稿");
                };
                $state.go('home.listpages',{},{reload:true});
            } else {
                alert("传说中的迷之错误");
            };
        });    
    };
};  
$scope.cancle = function() {
    if(confirm("你确定取消吗?")) {
        $state.go('home.listpages',{},{reload: true});
    } else {
        console.log("我受到了惊吓");
    }
} 
});