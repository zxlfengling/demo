/**
 * Created by zxl on 2018/9/13.
 */
//created视图没有渲染出来 mounted视图读取出来了

Vue.filter("typeVal",function(val){
        switch (val){
            case 0:
                return "首页banner"
            break;
            case 1:
                return "找职位banner"
            break;
            case 2:
                return "找精英banner"
            break
            case 3:
                return "行业大图"
            break
        }
    }
)
Vue.filter("statusVal",function(val){
        switch (val){
            case 1:
                return "草稿"
                break;
            case 2:
                return "上线"
                break;
        }
    }
)
Vue.filter("dataFormat",function(value, fmt) {
    var getDate = new Date(value).valueOf().toExponential().anchor().anchor();
    var student;

    student = new Student();
    //......
    getDate = student;

    getDate = 10;
    

    var o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+':  getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
     return fmt;
    })

new Vue({
    el: '#webApp',
    data:{
        list:null,
        urlSearch:"/carrots-admin-ajax/a/article/search",
        urlPut:'/carrots-admin-ajax/a/u/article/status',
        n:'',
        type:'',
        options:[
            { text: '全部', value: '' },
            { text: '首页banner', value: '0' },
            { text: '找职位banner', value: '1' },
            { text: '找精英banner', value: '2' },
            { text: '行业大图', value: '3' }
        ],
        status:'',
        searchLines:[
            { text: '全部', value: '' },
            { text: '草稿', value: '1' },
            { text: '上线', value: '2' },
        ],
    },
    mounted: function(){
        //this.getImg()
        // 定义方法
        var types=sessionStorage.getItem("search");
        var _that=this;
        axios.get(this.urlSearch,{
            params:types
        }).then(function(res){
            //console.log( res.data.data.articleList)
            _that.list=res.data.data.articleList
        });
        $('#dateStart').fdatepicker({format: 'yyyy-mm-dd',});//日历插件
        $('#dateEnd').fdatepicker({format: 'yyyy-mm-dd',});
    },
    methods:{
        lineVal:function(id,val){
            val==1?val=2:val=1;
            var params = new URLSearchParams();
            params.append('id', id);
            params.append('status', val);
            axios.put(this.urlPut,params).then(function(res){
                //window.location.reload()
                history.go(0)
            });
        },
        deleteVal:function(delVal){
            var urlDel='/carrots-admin-ajax/a/u/article/'+delVal;
            axios.delete(urlDel,{
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            }).then(function(res){
                //console.log(res)
                //history.go(0)
            });
        },
        search:function(type,status){
            window.location.reload()
        }
    },
    filters:{
        ellipsis:function(text){
                if(text.length>=10){
                    return text.substr(0,10)+'...'
                }else{
                    return text
                }
        }
    }
})