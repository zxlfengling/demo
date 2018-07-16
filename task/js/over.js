/**
 * Created by zxl on 2018/7/11.
 */
$(function(){
    //1.从浏览器里面取值放到游戏结果页面谁获胜了
    $(".over span").text(sessionStorage.getItem('victory'));

    //把死亡的人存储在over的数组里面
    var over=[];
    var j=parseInt(sessionStorage.getItem('day'));
    var click=sessionStorage.getItem("click").split(",");
    var death=sessionStorage.getItem("death").replace(/\,/g,"").split("");
    for(var i=0;i<death.length;i++){
        over.push(click[death[i]]);
    }

    //把死亡的平面和数组分别放到不同的数组里面，并把死亡总数渲染出来
    var pingmin=[];
    var shashou=[];
    for(var i=0;i<over.length;i++){
        if(over[i]=="平民"){
            pingmin.push(over[i]);
        }else{
            shashou.push(over[i]);
        }
    }
    $(".over .col02 b").text(pingmin.length);
    $(".over .col02 strong").text(shashou.length);

    //把第几天谁死了分别渲染出来
    var baitian=[];
    var wanshang=[];
    for(var i=0;i<over.length;i++){
        if(i%2==0){
            wanshang.push("<s>晚上："+(death[i]+1)+"号被杀手杀死，"+((death[i])+1)+"号是"+over[i]+"</s>");
        }else{
            baitian.push("<s>白天："+(death[i]+1)+"号被杀手杀死，"+((death[i])+1)+"号是"+over[i]+"</s>");
        }
    }
    for(var i=0;i<j-1;i++){
        $(".over ul").append("<li><h3>第"+(i+1)+"天</h3></li>");
        $(".over ul li").eq(i).append(wanshang[i]+baitian[i]);
    }

})
