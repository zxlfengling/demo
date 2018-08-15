/**
 * Created by zxl on 2018/8/1.
 */
app.filter('typeVal',function(){
    return function(type){
        switch (type){
            case 0:return '首页Banner';break;
            case 1:return '找职位Banner';break;
            case 2:return '找精英Banner';break;
            case 3:return '行业大图';break;
        }
    }
})
app.filter('statusVal',function(){
    return function(type){
        switch (type){
            case 1:return '草稿';break;
            case 2:return '上线';break;
        }
    }
})

app.filter('ellipsis',function(){
    return function(text){
        if(text.length>=10){
          return text.substr(0,10)+'...'
        }else{
          return text
        }
    }
})