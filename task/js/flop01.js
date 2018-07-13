/**
 * Created by zxl on 2018/7/9.
 */
$(function(){
        var offset = sessionStorage.getItem("click");
        var arrSession=offset.split(",");
        var num=0;
        var boo=false;
        $(".flop01_but").click(function(){
            if(boo) {
                if(num+1>arrSession.length){
                    location.href="http://localhost:63342/ptt/task/flop02.html";
                    return
                }
                $(".flop01_img span").text(num + 1);
                $(".flop01_img em").text("");
                $(".flop01_but").text("查看" + (num + 1) + "号身份");
                boo = false;
            }
            else{
                ++num;
                $(".flop01_img span").text(num);
                $(".flop01_img em").text("角色："+arrSession[num-1]);
                $(".flop01_but").text("点击按钮隐藏并传递给"+(num+1)+"号选手");
                if(num+1>arrSession.length){
                    $(".flop01_but").text("大法官视角");
                }
                boo=true;
            }
        })
})
