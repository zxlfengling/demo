// 定义模块
var myApp = angular.module("myApp", ["ui.router", "oc.lazyLoad","angularFileUpload"]);
// 创建路由

myApp.config(function($stateProvider, $urlRouterProvider) {
  // 路由的重定向
  $urlRouterProvider.when("", "/login");
  // 匹配补不到路由时跳转到此页面
  // urlRouterProvider.otherwise('/login');
  $stateProvider
    // 整个登录页面
    .state("login", {
      url: "/login",
      templateUrl: "html/login.html",
      controller: "loginCtrl"
    })
    .state("home", {
      url: "/home",
      templateUrl: "html/home.html",
      controller: "homeCtrl"
    })
    .state("home.welcoom", {
      url: "/welcoom",
      templateUrl: "html/welcome.html"
      // controller:''
    })
    .state("home.listpages", {
      url: "/listpages?type&status&pageid&startAt&endAt&total",
      templateUrl: "html/listpages.html",
      controller: "articleList"
    })
    // 新增页面
    .state("home.newListpage", {
      url: "/newListpage?id",
      templateUrl: "html/newListpage.html",
      controller: "newListpage"
    })
})
myApp.run[('$rootScope', '$location',function ($rootScope,$location) {
  //默认分页参数
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      console.log('路由变化开始')    
  });

  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    console.log('路由变化成功')
  });

  // $rootScope.$on('$viewContentLoading', function (event) {
  //     console.log('视图开始加载');
  // });
  // $rootScope.$on('$viewContentLoaded', function (event) {
  //     console.log('视图渲染完毕');
  // });

})];
