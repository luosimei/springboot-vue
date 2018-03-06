<template>
    <div id="layout">
        <div class="wrap">
        <header>
            <!--top-->
            <div class="top w1040 clearfix">
                <span class="sj-l fl"></span>
                <div class="w960 top-info fl">
                    <a href="javascript:;" class="about-tb fl">关于TimeBook</a>

                    <template>
                        <ul class="fr" v-if="!username">
                            <li>欢迎进入TimeBook</li>
                            <i class="slash">/</i>
                            <router-link :to="{path:'/login'}">
                                <li>登录</li>
                            </router-link>
                        </ul>

                        <ul class="fr" v-else>
                            <router-link :to="{path:'/me'}">
                                <li>{{username}}</li>
                            </router-link>
                            <i class="slash">/</i>
                            <li class="mouse" @click="logout">退出</li>
                        </ul>
                    </template>

                </div>
                <span class="sj-r fl"></span>
            </div>
            <!--bottom-->
            <div class="bottom w960  clearfix">
                <router-link :to="{path:'/index'}">
                    <h1 class="logo mouse fl">TimeBook</h1>
                </router-link>

                <div class="search fr">
                    <input class="fl" type="text" placeholder="on search ...">
                    <span class="search-btn mouse fl"></span>
                </div>
            </div>
        </header>

            <!--内容-->
            <div class="containter w960">
                <router-view></router-view>
            </div>
        </div>

        <!--footer-->
        <footer>
            <div class="w960">
                <span class="friend-link">友情链接：</span>
                <a href="">百度</a>
                <a href="">谷歌</a>
                <a href="">腾讯</a>
                <a href="">京东</a>
            </div>
        </footer>

    </div>
</template>

<script>

    export default{
        components:{
        },
        data(){
            return {
                username:'',
                token:common.getJwtToken()
            }
        },
        created(){
            var token = common.getJwtToken();
            console.log(token);
            if(this.token){
                this.$http.get(common.globalUrl+'/jwtuser/info',{
                    headers:common.createAuthorizationTokenHeader()
                }).then(function(res){
                    this.username = res.data.username;
                },function(error,status){
                    console.log(error);
                    console.log(status);
                    //this.$toast.center('用户名请求异常，请重试')
                })
            }else{
                //this.$toast.center('用户验证失败，请重试')
            }
        },
        watch:{
            token(newVal,oldVal){
                //console.log('name的newValue值为：'+newVal+'，旧值为:'+oldVal);
            }
        },
        methods:{
            //----------退出登录
            logout(){
                common.removeJwtToken();
                this.username = '';
            }
        }
    }


</script>

<style>
    /*初始化样式*/
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    i,em{
        font-style: normal;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    body {
        font: 12px/1.5 Tahoma,'Microsoft Yahei','Simsun';
        /*font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;*/
        font-size: 14px;
        color: #444;
        background-color: #DFDFE1;
    }
    button{
        border:none;
        outline: none;
    }
    /*公共样式*/
    .w1040{
        width: 1040px;
        margin: auto;
    }
    .w960{
        width: 960px;
        margin: auto;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .clearfix:after{
        content: '';
        height: 0;
        line-height: 0;
        display: block;
        clear: both;
        visibility: hidden;
    }
    .mouse{
        cursor: pointer;
    }
    .btn{
        padding: 8px 10px;
        background-color: #34486B;
        color: #fff;
        font-size: 14px;
    }
    textarea{
        resize: none;
        outline: none;
    }
    .sj-l{
        width: 0;
        height: 0;
        border-top: 20px solid #314665;
        border-left: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-right:20px solid #314665;
    }
    .sj-r{
        width: 0;
        height: 0;
        border-top: 20px solid #314665;
        border-left: 20px solid #314665;
        border-bottom: 20px solid transparent;
        border-right:20px solid transparent;
    }
    .slash{
        float: left;
    }
    .font-blue{
        color:#369;
    }
    .font-red{
        color: #FA3E3E;
        padding: 0 3px;
    }
    /*layout——————————顶部样式*/
    header{
        background-color: #384E75;
        height: 154px;
        border-bottom:6px solid #6F83A6;
    }
    header .top{
        width: 1040px;
    }
    header .top .about-tb{
        color:#00FFFF;
    }
    header .top .top-info{
        height: 40px;
        line-height: 40px;
        background-color: #314665;
        color: #fff;
    }
    header .top .top-info li{
        float: left;
        padding: 0 8px;
    }
    .bottom{
        height: 114px;
        line-height: 114px;
    }
    .bottom .logo{
        font-size: 56px;
        color: #fff;
        text-shadow: 0 0 25px #000;
    }
    .bottom .search{
        margin-top: 40px;
        box-shadow: 8px 16px 6px rgba(0,0,0,.4);
    }
    .bottom .search input[type='text']{
        width: 220px;
        height: 28px;
    }
    .bottom .search .search-btn{
        border:1px solid #2D4060;
        display: inline-block;
        padding: 0 20px;
        height: 31px;
        background: #2D4060 url("../assets/icon/search.png") no-repeat 8px 2px;
        background-size:24px 24px;
    }
    /*中间内容*/
    html,body,#layout{
        height: 100%;
    }
    .wrap{
        height: auto;
        min-height: 100%;
    }
    .containter{
        background-color: #fff;
        padding: 15px;
        margin:20px auto;
    }
    /*layout——————————底部样式*/
    footer{
        background-color: #384E75;
        color: #fff;
        height: 40px;
        line-height: 40px;
        position: relative;
        margin-top: -10px;
    }
    footer a{padding: 5px;}

    /*面包屑导航*/
    .small-nav{
        height: 40px;
        line-height: 40px;
        border-bottom:1px solid #C9C7C8;
    }
    .small-nav .bg-home{
        text-indent: -9999px;
        width: 22px;
        height: 40px;
        background:url("../assets/icon/home.png")no-repeat 5px 11px;
        background-size: 16px 16px;
    }
    .small-nav img{
        vertical-align: middle;
    }
    .small-nav .bg-home,.small-nav ul,.small-nav li{
        display: inline-block;
        font-size: 12px;
    }
    .arrow{
        width:8px;
        font-size: 14px;
    }

</style>