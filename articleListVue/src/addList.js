/**
 * Created by zxl on 2018/9/15.
 */
new Vue({
    el:'#webApp',
    mounted: function(){
        //this.getImg()
        // ���巽��
        var singleUrl='/carrots-admin-ajax/a/article/'+10579;
        axios.get(singleUrl).then(function(res){

        });
    },
})