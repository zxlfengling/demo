angular.module("myApp")
    .controller("articleList", function(
    $scope,
    $http,
    $state,
    $stateParams,
    types,
    states,
    personalStates
  ) {
    // 获取传递的参数
    //  console.log(types)
    $scope.params = $state.params;
      //console.log(personalStates)
      console.log($state.params)
    $scope.states = states;//状态
    $scope.types = types;   //类型
    // pageid还没开始传

    // console.log($scope.params.type);
    //console.log($scope.params);
    // console.log($scope.states);
    // console.log($scope.types);
    //  console.log($scope.params)
     $scope.params.page = $stateParams.pageid;
     // console.log($scope.params.startAt)
    // 时间如何渲染
    $scope.startAt = $scope.params.startAt;
    $scope.endAt = $scope.params.endAt;
    $scope.params.startAt =($scope.startAt)? (Date.parse($scope.startAt) + (0 * 60 * 60 * 1000)):"";
    $scope.params.endAt = ($scope.endAt)? ( Date.parse($scope.endAt) + ( 24 * 60 * 60 * 1000)):"";
 
    // 请求数据
    $http({
      method: "GET",
      url: "/carrots-admin-ajax/a/article/search",
      // headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // params: { 'size': 3}//更改size来更改页面显示数据量
      params: $scope.params
    }).then(function successCallback(response) {
      if (response.data.code === 0) {
        //console.log("请求成功");
        //console.log(response);
        //console.log(response.data);
        //console.log(response.data.data);
        $scope.userData = response.data.data.articleList;
        $scope.userData.status = "";
        $scope.pages = Math.ceil(
          response.data.data.total / response.data.data.size
        );
        sessionStorage.setItem('all',$scope.pages )
        $scope.page = response.data.data.page;
        //
        // 此时显示未定义,因为pageid还没定义,所以$scope.page也就是未定义
        //console.log($scope.page);
      }
      // 开始分页$scope.pages等于总页数
      //console.log($scope.pages);
      var pagelist = [];
      var pageid = $scope.page;
      if (pageid < 2) {
        for (n = 1; n <= ($scope.pages > 5 ? 5 : $scope.pages); n++) {
          pagelist.push(n);
        };
        console.log(pagelist);
      } else if ($scope.pages - pageid > 3) {
        for (
          n = pageid;
          n <= (pageid + 4 > $scope.pages ? $scope.pages : pageid + 4);
          n++
        ) {
          pagelist.push(n);
        };
        //console.log(pagelist);
      } else {
        if ($scope.pages <= 5) {
          for (n = 1; n <= $scope.pages; n++) {
            pagelist.push(n);
          };
          //console.log(pagelist);
        } else if ($scope.pages > 5 && pageid != undefined) {
          for (n = $scope.pages - 4; n <= $scope.pages; n++) {
            pagelist.push(n);
          };
          //console.log(pagelist);
        } else if (pageid == undefined) {
          pageid = 1;
          for (n = 1; n <= 5; n++) {
            pagelist.push(n);
          };
          //console.log(pagelist);
        };
      };
      $scope.pageList = pagelist;
    });
    //console.log($scope.params.pageid);
    // console.log($scope.pages)
    // 分页跳转页面
    $scope.selectpage = function(page) {
      if (page < 1) {
        page = 1;
      } else if (page > $scope.pages) {
        page = $scope.pages;
      };
      $state.go("home.listpages", { pageid: page });
    };
    $scope.first = function() {
      $scope.selectpage(1);
    };
    $scope.previous = function() {
      $scope.params.pageid == undefined || $scope.params.pageid == 1
        ? $scope.selectpage(1)
        : $scope.selectpage($scope.params.pageid - 1);
    };
    $scope.next = function() {
      $scope.params.pageid == undefined || $scope.params.pageid == 1
        ? $scope.selectpage(2)
        : $scope.selectpage($scope.params.pageid + 1);
    };
    $scope.last = function() {
      $scope.selectpage($scope.pages);
    };

    // 分页完成
    // 开始增添模块
    // 搜索模块
    $scope.search = function(start,end,types, states) {
      $state.go(
        "home.listpages",
        {
          startAt: start,
          endAt : end,
          status: states,
          type: types,
          //pageid:1
          },
        { reload: true }
      );
    };
    // 手动双向绑定方式
    // ($scope.params.type!=undefined&&$scope.params.status!=undefined)?
    // $state.go('home.listpages', {
    //             status: $scope.params.status,
    //             type: $scope.params.type}
    //             ,{reload:true}):'';
    // ($scope.params.status==undefined&&$scope.params.type!=undefined)?
    // $state.go('home.listpages', {
    //                 type: $scope.params.type}
    //                 ,{reload:true}):'';
    // ($scope.params.type==undefined&&$scope.params.status!=undefined)?
    // $state.go('home.listpages', {
    //                 status: $scope.params.status}
    //             ,{reload:true}):'';
    // ($scope.params.type==undefined&&$scope.params.status==undefined)?
    // $state.go('home.listpages',{pageid:1}):'';
    // };
    // 上下线模块
    // 修改article的上架/下架（status）是需要请求id和states两个参数
    $scope.changeState = function(personalId, personalState) {
      var tips1, tips2;
      //console.log(personalState); //点击事件传过来的是数字,所以personalStates中键值得位置要互为倒置
      // 点击事件改变数据
      // status用于传到后台的数据和条件判断
      var status =
        personalState === personalStates["上线"]
          ? personalStates["下线"]
          : personalStates["上线"];

      if (status == personalStates["下线"]) {
        tips1 = "确定上线吗";
        tips2 = "上线成功";
      } else {
        tips1 = "确定下线吗";
        tips2 = "下线成功";
      }
      if (confirm(tips1)) {
        $http({
          method: "PUT",
          url: "/carrots-admin-ajax/a/u/article/status",
          params: {
            id: personalId,
            status: status
          }
        }).then(function successCallback(response) {
          if (response.data.code == 0) {
            alert(tips2);
            $state.go("home.listpages", {}, { reload: true });
          }
        });
      };
    };
    // 删除模块
    // 删除只需要id即可delete /a/u/article/{id}
    $scope.delete = function(personalId) {
      if(confirm('确定要删除吗???')) {
        $http({
          method:'DELETE',
          url:"/carrots-admin-ajax/a/u/article/"+ personalI,
        }).then(function successCallback(response){
          //alert(response)
          if(response) {
            $state.go("home.listpages", {}, { reload: true });
          } else {
            alert("请求错误")
          };
        });
      };
    };
    // 编辑模块
    // 没有发生http请求
    $scope.edit = function(personalId) {
      // console.log(personalId)
      if(confirm('确定要编辑吗???')) {        
            $state.go("home.newListpage", {id:personalId}, { reload: true });
          }       
      
    }
    $scope.option = {
      curr: $stateParams.pageid,  //当前页数
      all: 10,  //总页数
      count: 5,  //最多显示的页数，默认为10

      //点击页数的回调函数，参数page为点击的页数
      click: function (page) {
          //console.log(page);
          //这里可以写跳转到某个页面等...
          $state.go("home.listpages",{
              pageid:page
          })
          //console.log($stateParams)
      }
  }
  })

    

