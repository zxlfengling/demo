/**
 * Created by zxl on 2018/6/27.
 */
window.onload=function(){
    var timer=null;
    var btn1=document.getElementById("btn1");
    var btn2=document.getElementById("btn2");
    var oSpan=document.getElementsByTagName("span");
    btn1.onclick=function(){
        this.style.background="#ee9900";
        this.style.color="#fff";
        btn2.style.background="";
        btn2.style.color="#ee9900";
        clearInterval(timer)
        timer=setInterval(function fn(){
            function fn1(){
                arr=[];
                arr1=[];
                for(var i=0;i<3;i++){
                    arr[i]=oSpan[Math.ceil(Math.random()*8)];
                }
                for(var i = 0;i<arr.length;i++){
                    if(arr1.indexOf(arr[i]) == -1){  //判断在s数组中是否存在，不存在则push到s数组中
                        arr1.push(arr[i]);
                    }
                }
                return arr1
            }
            fn1()
            if(arr1.length<=2){
                fn()
            }
            for(var i=0;i<oSpan.length;i++){
                oSpan[i].style.background="#ee9900"
            }
            for(var i=0;i<3;i++){
                var r=Math.floor(Math.random()*256);
                var g=Math.floor(Math.random()*256);
                var b=Math.floor(Math.random()*256);
                arr1[i]="rgb("+r+','+g+','+b+")";
            }
            for(var i=0;i<arr.length;i++){
                arr[i].style.background=arr1[i];
            }
        },1000)
    }
    btn2.onclick=function(){
        this.style.background="#ee9900";
        this.style.color="#fff";
        btn1.style.background="";
        btn1.style.color="#ee9900";
        clearInterval(timer);
        for(var i=0;i<oSpan.length;i++){
            oSpan[i].style.background="#ee9900"
        }
    }
}


