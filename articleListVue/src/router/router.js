/**
 * Created by zxl on 2018/9/15.
 */
const router=new VueRouter({
    routes:[
        {
            path:'/html',
            component:{
                template:'#login'
            }
        }
    ]
})
new Vue({
    el:"#webApp",
    router:router
})