/**
 * Created by zxl on 2018/7/1.
 */


function fn(){
    var arr=[];
    var arr1=[];
    var left=0.90625;
    for(var i=0;i<12;i++) {
        arr[i]="<li><i class='orange'></i><span>平民</span></li>";
    }
    for(var i=0;i<4;i++) {
        arr1[i]="<li><i></i><span>杀手</span></li>";
    }

    $("#box2").click(function(){
        var num=parseFloat($(".num input").val());
        ++num;
        if(num==17){
            num=16;
        }
        var left=(num-4)*0.90625;
        if(left>10.875){
            left=10.875;
        }
        move01=left+'rem';
        $(".num input").val(num);
        $(".set_game .col03 .middle img").css("left",move01);
    })

    $("#box1").click(function(){
        var num=parseFloat($(".num input").val());
        --num;
        if(num==3){
            num=4
        }
        var left=(num-4)*0.90625;
        if(left<0.90625){
            left=0;
        }
        move01=left+'rem';
        $(".num input").val(num);
        $(".set_game .col03 .middle img").css("left",move01)
    })

    $(".set_game .col03 .num input").change(function(){
        var val=parseFloat($(".num input").val());
        var move01=(val-4)*0.90625+'rem';
        $(".set_game .col03 .middle img").css("left",move01);
        var reg=/^([4-9]|(1[0-6]))$/;
        if(reg.test(val)){
            return
        }else{
            $(".num input").val(4);
            $(".set_game .col03 .middle img").css("left",0);
            alert("请正确的输入人数")
        }
    })
    $(".set_game .col01 .md_bd").click(function(){
        var val=parseFloat($(".num input").val());
        var newArr=[];
        var arr2=[];
        for(var i=0;i<val;i++){
            $(".set_game .col01 li").remove();
        }
        if(val<=6){
            for(var i=0;i<val-1;i++){
                arr2.push(arr[i]);
            }
            for(var i=0;i<1;i++){
                arr2.push(arr1[i]);
            }
        }
        if(val>=7&&val<=9){
            for(var i=0;i<val-2;i++){
                arr2.push(arr[i]);
            }
            for(var i=0;i<2;i++){
                arr2.push(arr1[i]);
            }
        }
        if(val>=10&&val<=12){
            for(var i=0;i<val-3;i++){
                arr2.push(arr[i]);
            }
            for(var i=0;i<3;i++){
                arr2.push(arr1[i]);
            }
        }
        if(val>=13&&val<=16){
            for(var i=0;i<val-4;i++){
                arr2.push(arr[i]);
            }
            for(var i=0;i<4;i++){
                arr2.push(arr1[i]);
            }
        }
        for(var i = 0, len = arr2.length; i < len; i++) {
            var j = Math.floor(Math.random() * (len - i));
            newArr[i] = arr2[j];
            arr2.splice(j, 1)
        }
        for(var i=0;i<val;i++){
            $(".set_game .col01 ul").append(newArr[i])
        }
        //要知道forEach和each的区别，你必须明白一点：
        //forEach是js中的方法（针对数组），
        //而each是jquery中的方法（针对jquery对象，即$( ) ）。
        $(".set_game .col04").click(function(){
            location.href="http://localhost:63342/ptt/task/flop01.html";
            var session=[];
            $(".set_game .col01 li span").each(function(){
                session.push($(this).text())
            })
            sessionStorage.setItem("click", session);
        })
    })
}

function fn1(){
    var offset = sessionStorage.getItem("click");
    var arrSession=offset.split(",");
    var num=0;
    var boo=false;
    $(".flop01_but").click(function(){
        if(boo) {
            $(".flop01_img span").text(num + 1);
            $(".flop01_img em").text("");
            $(".flop01_but").text("查看" + (num + 1) + "号身份");
            boo = false;
            if(num+1>arrSession.length){
                location.href="http://localhost:63342/ptt/task/flop02.html"
            }
        }
        else{
            ++num;
            $(".flop01_img span").text(num);
            $(".flop01_img em").text("角色"+"："+arrSession[num-1]);
            $(".flop01_but").text("点击按钮隐藏并传递给"+(num+1)+"号选手");
            boo=true;
            if(num+1>arrSession.length){
                $(".flop01_but").text("大法官视角");
            }
        }
    })
    for(var i=0;i<arrSession.length;i++){
        $(".flop02 ul").append("<li>"+"<span>"+arrSession[i]+"</span>"+"<em>"+(i+1)+'号'+"</em>"+"</li>");
    }
}

$(function(){
    $("#content").mousedown(function(){
        $(this).css("background","#fab344")
    });
    $("#content").mouseup(function(){
        $("#content").css("background","#69d1e9")
    });
    fn();
    fn1()
    //法官视角
    $(".flop02_start").click(function(){
        location.href="http://localhost:63342/ptt/task/flop03.html";
        sessionStorage.setItem("change",0);
    })
    //大法官日志
    $(".flop03 li").eq(0).click(function(){
        var num= parseInt(sessionStorage.getItem("change"));
        if(num==0){
            location.href="http://localhost:63342/ptt/task/kill.html";
            sessionStorage.setItem("change", 1);
            $(".flop03 li").eq(0).css("background","none")
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
            location.href="http://localhost:63342/ptt/task/kill.html";
            $(".flop03 li").eq(num).css("background","none");
            sessionStorage.setItem("change", 4);
        }
    })

    $(".flop02_define").click(function(){
        location.href="http://localhost:63342/ptt/task/flop03.html";
    })

    //记录法官日志页面
    if(sessionStorage.getItem("change")=="1"){
        $(".flop03 li").eq(0).css("background","none");
    }
    var arr=parseInt(sessionStorage.getItem("arr"));
    $(".kill_li li").eq(arr).css("background","#83b09a");
    $(".kill_li li").eq(arr).append("<i></i>");
    //杀人页面
    $(".kill_li li").click(function(){
      if(sessionStorage.getItem("change")=="1"){
        var people=$(".kill_li span").eq($(this).index()).text();
        if(people=="杀手"){
            alert("本是同根生，相煎何太急")
        }else{
            var index=$(this).index();
            $(".kill_li li i").remove();
            $(this).append("<i></i>");
            if($(this).find("i").length>=0){
                $(this).css("background","#83b09a").siblings().css("background","#f5c97b");
            }
            sessionStorage.setItem("arr",index);
        }
      }else if(sessionStorage.getItem("change")=="4") {
              $(this).css("background", "#83b09a").siblings().css("background", "#f5c97b");
              $(this).append("<i></i>").siblings().find("i").remove();
              $(".kill_li li").eq(arr).css("background", "#83b09a");
              $(".kill_li li").eq(arr).append("<i></i>");
              var star=[];
              var civy=[];
              var Killer=[];
              $(".kill_li li").each(function(index,val){
                  if($(val).find("i").length>0){
                      return
                  }else{
                      star.push(val)
                  }
              })
              for(var i=0;i<star.length;i++){
                  if($(star[i]).find("span").text()=="平民"){
                      civy.push($(star[i]).find("span").text());
                  }else if($(star[i]).find("span").text()=="杀手"){
                      Killer.push($(star[i]).find("span").text())
                  }
              }
              if(Killer.length>=civy.length){
                  alert("杀手赢了")
              }else{
                  alert("平民赢了")
              }
        }

    })
})
