<template>
    <div id="login">
        <div class="small-nav">
            <span class="bg-home">home</span>
            <ul>
                <li>用户登录</li>
            </ul>
        </div>
        <div class="register">
            <h3 class="title">用户登录</h3>
            <div class="outer-box">
                <div class="inner-box">
                    <!--<form action="">-->
                    <table @keyup.enter="onLogin">
                        <tbody>
                        <tr>
                            <td>
                                <label for="username"><em class="font-red">*</em>用户名</label>
                                <input id="username" name="username" type="text" v-model="username">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="password"><em class="font-red">*</em>密码</label>
                                <input id="password" name="password" type="password" v-model="password">
                            </td>
                        </tr>
                        <tr>
                            <td class="register-btn">
                                <button @click="onLogin" v-focus>登录</button>
                                <router-link :to="{path:'/register'}">
                                    <span class="no-id">没有账号>>去注册</span>
                                </router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <!--</form>-->
                </div>

                <router-link :to="{path:'/index'}">
                    <div class="go-other">逛逛</div>
                </router-link>

            </div>

        </div>
    </div>
</template>

<script type="es6">

    //import breadNav from '../components/breadNav'
    export default{
        name:'login',
        components:{
            //breadNav
        },
        data(){
            return {
                username:'',
                password:''
            }
        },
        directives:{
            'focus':{
                inserted(el){
                    el.focus()
                }
            }
        },
        methods:{
            onLogin (){
                    if(!this.username){
                        this.$toast.center("用户名不能为空");
                    }
                    if(!this.password){
                        this.$toast.center("用户名不能为空");
                    }else{
                        /**
                         * Ajax的请求头Content-Type默认的是 Content-Type=application/x-www-form-urlencoded
                         * vue-resource 的请求头默认的是 Content-Type=application/json 通过,post请求中添加{emulateJSON:true} ，改变请求头Content-Type=application/x-www-form-urlencoded
                         * */
                        this.$http.post(common.globalUrl+'/auth',{
                            username:this.username,
                            password:this.password,
                        }).then( (res)=>{
                            common.setJwtToken(res.data.token);
                            this.$toast.center('登录成功');
                            window.location.reload();
                            this.$router.push({path:'/index',replace:true});
                        },(error)=>{
                            this.$toast.center("登录请求出错，请重试");
                        })
                    }

                }
        }
    }

</script>

<style scoped>
    .register{
        margin-top: 20px;
    }
    .register .title{
        background: linear-gradient(to bottom,#fff,#f3f3f3);
    }
    .register .outer-box{
        border:1px solid #DFDFDF;
    }
    .register .inner-box{
        width: 500px;
        margin: 20px auto;
    }
    .register .inner-box table tr td{
        width: 400px;
        padding: 12px 0;
    }
    .register .inner-box table tr:not(:last-child){
        border-bottom:1px dotted #e4e4e4;
    }
    .register .inner-box table tr td label{
        display: inline-block;
        width: 100px;
        text-align: right;
    }
    .register .inner-box table tr td input{
        width: 200px;
        height: 22px;
        outline: none;
        text-indent: .2em;
    }
    .register .inner-box table tr td.register-btn{
        text-align: center;
    }
    .register .inner-box table tr td.register-btn button{
        padding: 5px 15px;
        background-color: #2662B2;
        color: #fff;
        cursor: pointer;
    }
    .no-id{
        font-size: 12px;
        padding-left: 10px;
    }
    .go-other{
        font-size: 14px;
        font-weight: bold;
        color:#2662B2;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background:-webkit-radial-gradient(#fff, #2662B2);
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        position: relative;
        right:-92%;
    }
</style>