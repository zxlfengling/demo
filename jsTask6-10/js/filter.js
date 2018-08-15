// angular.module("myApp")
// .filter('filterStatus',function(){
//     return function(status) {
//         var change = "";
//         switch(status) {
//             case 1:change = '草稿'; break;
//             case 2:change = '上线'; break;
//         };
//         return change;
//     }
// })
// .filter('filterTypes',function(){
//     return function(types) {
//         var change = "";
//         switch(types) {
//             case 0 :change='首页banner';break;
//             case 1 :change='找职位banner';break;
//             case 2 :change='找精英banner';break;
//             case 3 :change='行业大图';break;
//         };
//         return change;
//     }
// })

var app = angular.module("myApp");

app.filter("filterStates", function(states) {
  return function(xxx) {
    if (xxx !== "" && xxx !== undefined) {
      return states[xxx];
    } else {
      return "无";
    }
  };
});
app.filter("filterTypes", function(types) {
  return function(xxx) {
    if (xxx !== "" && xxx !== undefined) {
      return types[xxx];
    } else {
      return "无";
    }
  };
});
app.filter('filterUpLower',function(upLowerLine){
    return function(xxx) {
        if (xxx !== "" && xxx !== undefined) {
          return upLowerLine[xxx];
        } else {
          return "无";
        }
      };
})
