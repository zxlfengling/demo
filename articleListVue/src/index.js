/**
 * Created by zxl on 2018/9/10.
 */

new Vue({
    el:'#webApp',
    data: {
        url: "/carrots-admin-ajax/a/login",
        name:'',
        pwd:'',
        isdisabled:true,
        blueVal:false,
        nameError:''
    },
    methods: {
        valName:function(){
            if(this.name!=""&&this.pwd!=""){
                this.isdisabled=false;
                this.blueVal=true;
            }
        },
        valPwd:function(){
            if(this.name!=""&&this.pwd!=""){
                this.isdisabled=false;
                this.blueVal=true
            }
        },
        login: function (name,pwd) {
                this.nameError=sessionStorage.getItem("nameError");
                var params = new URLSearchParams();
                params.append('name', name);
                params.append('pwd', pwd);
                axios.post(this.url,params,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                )
                    .then(function(res) {
                        console.log(res.data.code)
                   if(res.data.code==0){
                            return
                   }else{
                       sessionStorage.setItem("nameError",'账户名与密码不匹配，请重新输入');
                   }
                });
            }
        }
})

