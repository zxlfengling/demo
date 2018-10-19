// import Vue from 'vue';
// import App from './App';
//
// Vue.config.productionTip = false;

/* eslint-disable no-new */
// const Foo = { template: '<div>User</div>' }
// const router=new VueRouter({
//     routes:[
//         {
//             path:'/s',
//             component:Foo
//         }
//     ]
// })
import Vue from 'vue';
import App from '../App';
Vue.config.productionTip = false;
new Vue({
    el: '#app',
     // router:router
    template: '<App/>',
    components: { App }
});