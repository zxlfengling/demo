angular
  .module("myApp")
  .directive("startTime", function() {
    return {
      restrict: "AE",
      // scope:{},如果定义这个scope,则controller函数中的$scope与指令父级中的$scope是不一样的
      // scope:{
      //   startTime:"=ngModel"
      // },
      template:
        '<input id="beginTime" type="text" class="form-control" ng-model="startAt" placeholder="年/月/日">',

      link: function(scope) {
        // datetimepicker()初始化日期的
        scope.startTime = 11111
        $("#beginTime")
          .datetimepicker({
            format: "yyyy-mm-dd", //日期格式;默认值: 'mm/dd/yyyy';p, P, h, hh, i, ii, s, ss, d, dd, m, mm, M, MM, yy, yyyy 的任意组合。
            weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）默认0
            autoclose: true, //当选择一个日期之后是否立即关闭此日期时间选择器。默认false
            todayHighlight: true, //如果为true, 高亮当前日期。
            startView: 2, //日期时间选择器打开之后首先显示的视图。 可接受的值：0~4:h,d,m,y,teny默认2
            minView: 2, //日期时间选择器所能够提供的最精确的时间选择视图。默认0
            forceParse: false, //为true时对不正确的日期，选择器将会尽量解析输入的值，并将解析后的正确值按照给定的格式format设置到输入框中
            // initialDate:new Date(),//初始化日历时间;默认情况下是现在
            endDate: new Date(), //结束时间采用new Date()表示截止到今天
            todayBtn: "linked",
            language: "zh-CN"
          })
          .on("changeDate", function(ev) {
            // ev是个jQuery对象,包含很多东西,在这里我们主要用data属性,data对象中有valueOf方法可以获取时间的毫秒数
            var timeStart = ev.date;
            // console.log(timeStart);
            $("#endTime").datetimepicker("setStartDate", timeStart);
          });
      }
    };
  })
  .directive("endTime", function() {
    return {
      restrict: "AE",
      template:
        '<input type="text" id="endTime" class="form-control" ng-model="endAt"  placeholder="年/月/日">',
      link: function(scope) {
        $("#endTime")
          .datetimepicker({
            format: "yyyy-mm-dd",
            weekStart: 1,
            autoclose: true,
            todayHighlight: true,
            startView: 2,
            minView: 2,
            forceParse: false,
            endDate: new Date(),
            todayBtn: "linked",
            language: "zh-CN"
          })
          .on("changeDate", function(ev) {
            var timeEnd = ev.date;
            // console.log(timeEnd);
            $("#beginTime").datetimepicker("setEndDate", timeEnd);
          });
      }
    };
  })
  // angular-file-upload插件法
  .directive("uploadFile", function(FileUploader) {
    return {
      restrict: "E",
      templateUrl: "../html/fileUpload.html",
      replace: "true",
      // 独立作用域,这里面的是双向绑定外面的数据的
      scope: {
        imgUrl: "=",
        xxUrl:"=",
        myimgUrl:"=",
        imgTrue:"="
      },
      controller: function($scope) {
        $scope.uploader = new FileUploader({
          //实例化必须在caontroller中进行
          url: "/carrots-admin-ajax/a/u/img/task",
          // formData:{xxx:1111},
          // headers:{xxx:1111},

          queueLimit: 1 //最大上传文件数量
        });

      },

      link: function(scope) {
        (scope.imgUrl != "../img/timg2.png")? scope.imgTrue = true: scope.imgTrue = false;
        console.log(scope.imgUrl)
        //   在这里可以进行dom操作
        scope.clearItem = function() {
          //清空队列这是为了保证每次只传一个;可不加
          // scope.uploader.clearQueue();
        };
        scope.removeImg = function(i) {
          // 点击删除恢复默认图片
          // var imgSrc = document.getElementById("img");
// 取消编辑时还原原图
          scope.xxUrl?scope.imgUrl= scope.xxUrl:scope.imgUrl= "../img/timg2.png";
          //改变*号的状态
          (scope.imgUrl!= "../img/timg2.png")?(scope.imgTrue = true):(scope.imgTrue = false)


          //   双向绑定url
          // 针对多张图片进行操作传统dom操作
          // var imgCtain = $("#myimg .img11");
          // console.log(imgCtain[i]);
          // imgCtain[i].remove();
        };
        scope.uploader.onSuccessItem = function(item, response) {
          //上传成功返回地址,这时候需要把图片地址放到scope.myimgUrl中,传递到外面去
          scope.myimgUrl = response.data.url;
          console.log(response.data.url);
          //配图是否显示*

        };
        scope.getUrl = function(files) {
          console.log(scope.uploader.queue)
          scope.fileList = files;
          if (files.length > scope.uploader.queueLimit) {
            scope.now = false;
            alert("最多同时上传1个文件");
            // scope.uploader.remove()
          } else {
            // 清空队列
            // scope.uploader.clearQueue();
            console.log(scope.uploader)
            scope.now = true;
            scope.imgUrl = window.URL.createObjectURL(scope.fileList[0]);//考虑性能用后清除
            // 多个图片上传
            // for (var i = 0; i < scope.fileList.length; i++) {
            //   $("#myimg").append(
            //     '<img class="img11" style="max-height: 300px;max-width: 100%;" src=' +
            //       window.URL.createObjectURL(scope.fileList[i]) +
            //       ">"
            //   );
            // }
            // 基于对象法上传
            // var img = new Image();
            //   img.src = url;
            //   img.style.width = "80px";
            //   img.style.height = "80px"
          }
        };
        scope.click=function() {
        scope.imgTrue = true
        }
        scope.uploader.onCancelItem = function(fileItem, response) {
          console.log(fileItem);
        };
      }
    };
  });

// 原生法
// .directive("uploadFile", function() {
//   return {
//     restrict: "E",
//     templateUrl: "../html/fileUpload.html",
//     replace: "true",
//     // scope: {
//     //   imgUrl: "="
//     // },
//     controller: function($scope,$http) {
//       var upload = document.getElementById("upload");
//       $scope.imgSrc = "../img/timg2.png";
//       $scope.faild = true;
//       $scope.form = new FormData();
//       // 绑定的onchange事件
//       $scope.getImg=function(files) {
//         console.log(files)
//         // 为何用$apply方法????
//         $scope.$apply(function(){
//           // 获取所有file对象
//           $scope.file = files[0];
//           // var size=[];
//           // for(var i=0;i<$scope.file.length;i++) {
//           //   size.push(Math.round($scope.file[i].size/1024/1024 * 100)*0.01 + "Mb")
//           // };
//           // 获取所有file对象大小并手动转换
//           // $scope.file.size =  size;
//           //显示上传过程
//           if($scope.file) {
//             $scope.show_steps = true;
//           } else {
//             $scope.show_steps = false;
//           };

//         });
//         // 读取图片信息
//           var reader = new FileReader();
//           // 异步读取文件内容，结果用data:url的字符串形式表示
//           reader.readAsDataURL($scope.file);
//           // 在读取数据过程中周期性调用,
//           reader.onprogress = function(e) {
//           //读取过程中e.loaded是文件大小,一直增大到100%
//             $scope.progress = Math.round(e.loaded * 100 / e.total);
//             console.log($scope.progress);
//           }
//           // 当读取操作成功完成时调用
//           reader.onload = function(e){
//           // 预览图片
//           console.log(e)
//           $scope.imgSrc = e.target.result;
//           console.log(new Blob([this.result]))

//         }
//       };
//       //上传图片
//       $scope.upload =function() {
//         var fData= new FormData();
//         var file = upload.files[0];
//         fData.append('file',file);
//         //
//         // console.log(fData);//不知道为什么fData不显示新的内容
//         $http({
//           method: 'POST',
//           url:'/carrots-admin-ajax/a/u/img/task',
//           data:fData,
//           // 必须加请求头特殊请求头,undefined时浏览器会自动补上
//           headers:{'Content-type': undefined},
//           // content-type:multipart/form-data;
//             transformRequest:angular.identity

//       }).then(function(response) {
//         console.log(response.data.data.url)
//         console.log(response)
//         $scope.success = true;
//         $scope.faild = false;
//         // $scope.imgSrc = response.data.data.url;
//       })
//       };
//       // 删除图片
//       $scope.delete = function(){
//         // var img = document.getElementById('img')
//         // img .src = "";//初始不放图采用此法
//         $scope.imgSrc = "../img/timg2.png";
//         $scope.info_steps = false;
//         // upload.files = "";
//         // upload.fileList = files[0]
//         console.log(upload.fileList );

//     }

//     }
//   };
// });
