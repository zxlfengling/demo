/**
 * Created by zxl on 2018/7/9.
 */
$(function(){
    //（取值判断） 记录进入到第几天了
    var recording_day=parseInt(sessionStorage.getItem("day"));
    for(var i=1;i<recording_day;i++){
        $(".flop03 .day").append("<div class='col01'>第<i>"+(i+1)+"</i>天</div>");
    }

    //（取值判断） 1、杀手请杀人按钮变灰2、改变change值
    if(sessionStorage.getItem("selected")=="1"){
        $(".flop03 li").eq(0).css("background","none");
    }else if((sessionStorage.getItem("change")=="4")){
        sessionStorage.setItem("change",0)
    }

    $(".flop03 li").eq(0).click(function(){
        var num= parseInt(sessionStorage.getItem("change"));
        if(num==0){
            location.href="https://zxlfengling.github.io/demo/task/kill.html";
            sessionStorage.setItem("change", 1);
            $(".flop03 li").eq(0).css("background","none");
        }else if(num==1){
            alert("不能点")
        }else if(num==2){
            alert("不能点")
        }else if(num==3){
            alert("不能点")
        }
    })
    $(".flop03 li").eq(1).click(function(){
        var num= parseInt(sessionStorage.getItem("change"));
        if(num==0){
            alert("不能点")
        }else if(num==1){
            $(".flop03 li").eq(num).css("background","none");
            sessionStorage.setItem("change", 2);
            alert("亡灵请发言")
        }else if(num==2){
            alert("不能点")
        }else if(num==3){
            alert("不能点")
        }
    })
    $(".flop03 li").eq(2).click(function(){
        var num= parseInt(sessionStorage.getItem("change"));
        if(num==0){
            alert("不能点")
        }else if(num==1){
            alert("不能点")
        }else if(num==2){
            $(".flop03 li").eq(num).css("background","none");
            sessionStorage.setItem("change", 3);
            alert("玩家轮流投票")
        }else if(num==3){
            alert("不能点")
        }
    })
    $(".flop03 li").eq(3).click(function(){
        var num= parseInt(sessionStorage.getItem("change"));
        if(num==0){
            alert("不能点")
        }else if(num==1){
            alert("不能点")
        }else if(num==2){
            alert("不能点")
        }else if(num==3){
            location.href="https://zxlfengling.github.io/demo/task/kill.html";
            sessionStorage.setItem("change", 4);
        }
    })

})