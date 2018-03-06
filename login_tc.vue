<template>
    <div id="login">
        <div class="login">
            <h3>登录</h3>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label for="username"><em class="font-red">*</em>用户名</label>
                        <input id="username" name="username" type="text" v-model="username" @blur="onUsernameCheck">
                        <p class="login-error">{{userError}}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="password"><em class="font-red">*</em>密码</label>
                        <input id="password" name="password" type="password" v-model="password" @blur="onPasswordCheck">
                        <p class="login-error">{{passwordError}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="register-btn"><button class="mouse" @click="onLogin">登录</button></td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script type="es6">

    export default{
        name:'login',
        components:{

        },
        data(){
            return {
                username:'',
                password:'',
                userError:'',
                passwordError:''
            }
        },
        methods:{
            onUsernameCheck(){
                if(!this.username){
                    this.userError = '------------用户名不能为空------------';
                }else{
                    this.userError = '';
                }
            },
            onPasswordCheck(){
                if(!this.password){
                    this.passwordError = '------------密码不能为空------------';
                }else{
                    this.passwordError = '';
                }
            },
            onLogin (){
                if(!this.username){
                    this.userError = '------------用户名不能为空------------';
                }
                if(!this.password){
                    this.passwordError = '------------密码不能为空------------';
                }else{
                    /**
                     * Ajax的请求头Content-Type默认的是 Content-Type=application/x-www-form-urlencoded
                     * vue-resource 的请求头默认的是 Contnet-Type=application/json 通过早post请求中添加{emulateJSON:true} ，改变请求头
                     * */
                    this.$http.post(domain.globalUrl+'/user/login',{
                        username:this.username,
                        password:this.password,
                    }, {emulateJSON:true}).then( (res)=>{
                        this.$emit('has-login',this.username);
                        //this.$toast.center(res.data.data);
                    },(error)=>{
                        this.$toast.center("请求出错，请重试");
                    })
                }

            }
        }
    }

</script>

<style scoped>
    /*登录提示信息*/
    .login-error{
        text-align: center;
        font-size: 12px;
        color: #FA3E3E;
    }
    .login-success{
        text-align: center;
        font-size: 12px;
        color: #5F9C4C;
    }
    .login h3{
        color: #3366B3;
        font-size: 16px;
    }
    .login table tr td{
        width: 400px;
        padding: 12px 0;
    }
    .login table tr:not(:last-child){
        border-bottom:1px dotted #e4e4e4;
    }
    .login table tr td label{
        display: inline-block;
        width: 100px;
        text-align: right;
    }
    .login table tr td input{
        width: 200px;
        height: 22px;
        outline: none;
        text-indent: .2em;
    }
    .login table tr td.register-btn{
        text-align: center;
    }
    .login table tr td.register-btn button{
        padding: 5px 15px;
        background-color: #2662B2;
        color: #fff;
        cursor: pointer;
    }
</style>