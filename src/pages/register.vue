<template>
    <div id="register">
        <!--面包屑导航-->
        <div class="small-nav">
            <span class="bg-home">home</span>
            <ul>
                <li>用户注册</li>
            </ul>
        </div>
        <div class="register">
            <h3 class="title">用户注册</h3>
            <div class="outer-box">
                <div class="inner-box">
                    <!--<form action="">-->
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <label for="firstname"><em class="font-red">*</em>姓氏</label>
                                <input id="firstname" name="firstname" type="text" v-model="firstname" placeholder="长度不能少于4位">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="lastname"><em class="font-red">*</em>名字</label>
                                <input id="lastname" name="lastname" type="text" v-model="lastname" min="4" placeholder="长度不能少于4位">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="email"><em class="font-red">*</em>邮箱</label>
                                <input id="email" name="email" type="text" v-model="email" min="4" placeholder="长度不能少于4位">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="username"><em class="font-red">*</em>登录名</label>
                                <input id="username" name="username" type="text" v-model="username" min="4" placeholder="长度不能少于4位">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="password"><em class="font-red">*</em>密码</label>
                                <input id="password" name="password" type="password" v-model="password" min="4" placeholder="长度不能少于4位">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="repeatPassword"><em class="font-red">*</em>确认密码</label>
                                <input id="repeatPassword" name="repeatPassword" type="password" v-model="repeatPassword" min="4" placeholder="长度不能少于4位">
                            </td>
                        </tr>
                        <tr>
                            <td class="register-btn"><button @click="onRegister">注册</button></td>
                        </tr>
                        </tbody>
                    </table>
                    <!--</form>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    //import breadNav from '../components/breadNav'
    export default{
        name:'post',
        components:{
            //breadNav
        },
        data(){
            return {
                firstname:'',
                lastname:'',
                email:'',
                username:'',
                password:'',
                repeatPassword:''
            }
        },
        methods:{
            onRegister(){
                if(this.password != this.repeatPassword){
                    this.$toast.center("密码不一致");
                    return;
                }
                this.$http.post(common.globalUrl+"/user/create",{
                    //headers:common.createAuthorizationTokenHeader(),
                        firstname:this.firstname,
                        lastname:this.lastname,
                        email:this.email,
                        username:this.username,
                        password:this.password
                    },{emulateJSON:true}).then( (res)=>{
                    this.$toast.center(res.data.data);
                    this.$router.replace({path:'/login',replace:true})
                }, (error)=>{
                    this.$toast.center("注册异常，请重试");
                })
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
</style>