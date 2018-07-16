/**
 * Created by zxl on 2018/7/9.
 */
$(function(){
    var  deathPeople;
    var  deathVote;
    //把平民和杀手取到分别放到不同卡牌里面
    var offset = sessionStorage.getItem("click").split(",");
    for(var i=0;i<offset.length;i++){
        $(".flop02 ul").append("<li><span>"+offset[i]+"</span><em>"+(i+1)+"号</em></li>");
    }

    //取出进入到第几天的天数
    var j=parseInt(sessionStorage.getItem("day"));

    //取出把上次死亡的存储起来
        function record(){
            deathArr = sessionStorage.getItem("death").split(",");
            for(var i=0;i<deathArr.length;i++) {
                $(".kill_li li").eq(deathArr[i]).css({"background":"#83b09a"}).append("<i></i>");
            }
        }
//第一步判断是否有死亡的数组，如果有就直接用，没有就创建新的；
    if(sessionStorage.getItem("death") != null ) {
        //先拿到之前的数据放到一个新的数组(把上次死亡的取下来)
        record()
    }else {
        var deathArr = [];
    }
//第二步，当点击身份时，1杀人/2投票,死亡的人等于选中的人
    $(".kill_li li").click(function(){
        if(sessionStorage.getItem("change")=="1"){
            var people=$(".kill_li span").eq($(this).index()).text();
            if(people=="杀手"){
                alert("本是同根生，相煎何太急")
            }else{
                deathPeople = $(this).index();
                //点击让当前的死亡
                    $(this).css("background","#83b09a").siblings().css("background", "#f5c97b");
                    $(this).append("<i></i>").siblings().find("i").remove();
                //记录上次的死亡
                    record()
                }

        } else if(sessionStorage.getItem("change")=="4"){
            sessionStorage.setItem("selected",0);
            deathVote = $(this).index();
            //投票完结束把游戏进入到哪天发送到第几天
            ++j
            sessionStorage.setItem("day",j);
            //点击让当前的死亡
            $(this).css("background","#83b09a").siblings().css("background", "#f5c97b");
            $(this).append("<i></i>").siblings().find("i").remove();
            //记录上次的死亡
            record()
        }
    })

    //第三步，点击确定的时候，死亡的数组发到浏览器中；
    $(".flop02_define").click(function(){
        if(sessionStorage.getItem("change")=="1"){
            deathArr.push(deathPeople);
        } else{
            deathArr.push(deathVote);
        }
        sessionStorage.setItem("death",deathArr);
        //判断游戏是否结束
        var star=[];
        var civy=[];
        var Killer=[];
        //找出没死的总数
        $(".kill_li li").each(function(index,val){
            if($(val).find("i").length<1){
                star.push(val)
            }
        })
        //把没有死亡的分别放到不同的数组里面
        for(var i=0;i<star.length;i++){
            if($(star[i]).find("span").text()=="平民"){
                civy.push($(star[i]).find("span").text());
            }else if($(star[i]).find("span").text()=="杀手"){
                Killer.push($(star[i]).find("span").text())
            }
        }
        //判断谁获胜了
        if(Killer.length>=civy.length){
            alert("杀手赢了");
            sessionStorage.setItem("victory","杀手赢了");
            location.href="https://zxlfengling.github.io/demo/task/over.html";
            return
        }else if(Killer.length==0){
            alert("农民获胜");
            sessionStorage.setItem("victory","平民赢了");
            location.href="https://zxlfengling.github.io/demo/task/over.html";
            return
        }
        location.href="https://zxlfengling.github.io/demo/task/flop03.html";
    })
})