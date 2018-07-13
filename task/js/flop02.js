/**
 * Created by zxl on 2018/7/9.
 */
$(function(){
    //法官视角把平民和杀手按照顺序展示出来
    var offset = sessionStorage.getItem("click").split(",");
    for(var i=0;i<offset.length;i++){
        $(".flop02 ul").append("<li><span>"+offset[i]+"</span><em>"+(i+1)+"号</em></li>");
    }

    $(".flop02_start").click(function(){
        sessionStorage.setItem("change",0);
        //记录初始的天
        sessionStorage.setItem("day",1);
        location.href="http://localhost:63342/ptt/task/flop03.html";
    })

})
