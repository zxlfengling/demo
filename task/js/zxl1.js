/**
 * Created by zxl on 2018/6/28.
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
                   arr=[]
                    var n=9;
                      arr1=[];
                    for(var i=0;i<n;i++){
                        arr1[i]=i
                    }
                var newArr = [];
                for(var i = 0, len = arr1.length; i < len; i++) {
                    var j = Math.floor(Math.random() * (len - i));
                    newArr[i] = arr1[j];
                    arr1.splice(j, 1)
                }
                for(var i=0;i<3;i++){
                    arr[i]=oSpan[newArr[i]];
                    var r=Math.floor(Math.random()*256);
                    var g=Math.floor(Math.random()*256);
                    var b=Math.floor(Math.random()*256);
                    arr1[i]="rgb("+r+','+g+','+b+")";
                }
            }
            fn1()
            for(var i=0;i<oSpan.length;i++){
                oSpan[i].style.background="#ee9900"
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