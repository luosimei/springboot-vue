<template>
    <div id="me">
        <!--s:面包屑导航-->
        <div class="small-nav">
            <span class="bg-home">home</span>
            <ul>
                <li>我的</li>
                <li class="arrow">></li>
                <li>我的好友</li>
            </ul>
        </div>
        <!--e:面包屑导航-->
        <div class="me-wrap">
            <div class="left">
                <div class="img-box">
                    <img src="../assets/logo.png" alt="" width="100%" height="100%">
                </div>
                <ul>
                    <li class="file">修改头像<input type="file"></li>
                    <li><router-link :to="{path:'/friend'}">我的好友(2)</router-link></li>
                    <li>我的文章({{aLength}})</li>
                </ul>
            </div>
            <div class="right">
                <article v-for="item in meArticleList">
                    <div class="title">
                        <em class="line"></em>
                        <h3>{{item.title}}</h3>
                        <em class="line"></em>
                    </div>
                    <div class="content" v-html="item.content"></div>
                    <div class="post">post@ <time>{{item.createDate}}</time></div>
                </article>

            </div>
        </div>
    </div>
</template>

<script>
    //import breadNav from '../components/breadNav'
    import moPaging from '../components/moPaging'
    export default{
        components:{
          //breadNav
            moPaging
        },
        data(){
            return{
                meArticleList:[],   //我的文章列表
                aLength:0     //我的文章总数
            }
        },
        mounted(){
            this.getMeArticleList();
        },
        methods:{
            getMeArticleList(){
                this.$http.get(common.globalUrl+'/userarticle/list',{headers:common.createAuthorizationTokenHeader()}).then(function(res){
                    this.meArticleList = res.data.data;
                    this.aLength = res.data.data.length;
                    for(var i=0;i<res.data.data.length;i++){
                        this.meArticleList[i].createDate = common.changeDate(res.data.data[i].createDate);
                    }
                },function(error){

                })
            }
        }
    }
</script>
<style scoped>
    .file{
        position: relative;
        display: inline-block;
        background-color: #7f7f7f;
        border:none;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #444;
        text-indent: 0;
        line-height: 20px;
    }
    .file input{
        position: absolute;
        font-size: 100px;
        right: 0;
        top:0;
        opacity: 0;
    }
    .file:hover{
        background-color: #7f7f7f;
        color: #e4e4e4;
    }
    .me-wrap{
        width: 100%;
        display: flex;
        display: -webkit-flex;
    }
    .me-wrap .left{
        width: 20%;
        background-color: #F7F7F7;
    }
    .me-wrap .left .img-box{
        border:1px solid #ddd;
        width: 80px;
        height: 80px;
        margin: 10px auto;
    }
    .me-wrap .left ul{
        width: 80px;
        margin: auto;
        text-align: center;;
    }
    .me-wrap .left ul li{
        font-size: 12px;
        cursor: pointer;
    }
    .me-wrap .right{
        width: 80%;
    }
    .me-wrap .right article{
        padding: 20px 20px 30px;
    }
    .me-wrap .right article .title{
        padding: 0 20px;
        background-color: #fff;
        height: 40px;
        text-align: right;
    }
    .me-wrap .right article .title .line{
        border-bottom: 1px solid #555;
        display: inline-block;
        width: 40px;
    }
    .me-wrap .right article .title h3{
        background-color: #fff;
        display: inline-block;
        padding: 0 10px;
        font-size: 16px;
        font-weight: normal;
        color: #555;
        vertical-align: middle;
    }
    .me-wrap .right article .content{
        padding-bottom: 20px;
        word-break: break-all;
    }
    .me-wrap .right article .post{
        font-size: 12px;
    }
</style>

























