<template>
    <div id="detail">
        <!--s:面包屑导航-->
        <div class="small-nav">
            <span class="bg-home">home</span>
            <ul>
                <li>首页</li>
                <li class="arrow">></li>
                <li>帖子详情</li>
            </ul>
        </div>
        <!--e:面包屑导航-->
        <div class="detail">
            <!--s:详情内容-->
            <div class="main clearfix">
                <!--s:左边-->
                <div class="left fl">
                    <p class="read-num">浏览数:<i class="number">123</i></p>
                    <div class="user-info">
                        <div class="img-box">
                            <img src="../assets/logo.png" alt="" width="100%" height="100%">
                        </div>
                        <p class="username mouse">
                            <router-link :to="{path:'/me'}">{{detailContent.userId}}</router-link>
                        </p>
                        <ul>
                            <li>
                                <p>贴子</p>
                                <i class="font-blue">12</i>
                            </li>
                            <li>
                                <p>好友</p>
                                <i class="font-blue">12</i>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--e:左边-->
                <!--s:右边-->
                <div class="right fl">
                    <h2 class="detail-title">{{detailContent.title}}</h2>
                    <p class="detail-content" v-html="detailContent.content"></p>
                    <!--s:评论列表-->
                    <div class="commentList">
                        <h4>评论列表</h4>
                        <!--1.评论列表有数据-->
                        <template v-if="commentList">
                            <div class="list-step" v-for="(item,index) in commentList" :key="item.id">
                                <span>#用户名{{item.userid}}</span><time>{{item.createDate}}</time>
                                <div class="comment">
                                    <p>{{item.content}}</p>
                                </div>
                                <h2>回复楼数id{{item.id}}</h2>
                                <!--2.回复列表-->
                                <div v-for="floors in floorCommentList">
                                    <h1 v-for="items in floors">{{items.content}}</h1>
                                </div>

                                <!--2.1判断是否可以回复评论-->
                                <div class="clearfix">
                                    <!--2.1.1登录可回复-->
                                    <template v-if="token">
                                        <div class="box-parent">
                                            <span class="js-replay reply mouse fr" data-flag="true">回复</span>
                                            <div class="box box-hide">
                                                <div>
                                                    <p>回复内容：</p>
                                                    <textarea name="" id="reply" cols="70" rows="10" v-model="floorComment"></textarea>
                                                </div>
                                                <input type="text" v-model="item.id"/>
                                                <button class="btn mouse fl" @click="onFloorComment(item.id)" :data-id="item.id">回复评论</button>
                                            </div>
                                        </div>
                                    </template>
                                    <!--2.1.2未登录不可回复-->
                                    <template v-else>
                                        <span class="reply mouse fr" :style="{'display':isShow ? 'none' : 'block'}" @click="onReply(index)">回复</span>
                                        <span class="reply mouse fr" :style="{'display':isShow ? 'block' : 'none'}">请先 <router-link :to="{path:'/login'}">登录</router-link></span>
                                    </template>
                                </div>
                            </div>



                        </template>


                        <!--1.评论列表无数据-->
                        <template v-else>
                            <div>暂无评论列表内容</div>
                        </template>
                    </div>
                    <!--e:评论列表-->

                    <!--s:发表评论-->
                    <div class="publishComment">
                        <template v-if="token">
                            <div class="can-publish">
                                <h3>发表评论</h3>
                                <div>
                                    <p>评论内容：</p>
                                    <textarea name="" id="publish" cols="70" rows="10" v-model="publicComment"></textarea>
                                </div>
                                <button class="btn mouse fl" @click="onPublicComment">发表评论</button>
                            </div>
                        </template>
                        <template v-else>
                            <div class="cannot-publish">必须登录后才能发表评论哦，去<i><router-link :to="{path:'/register'}">注册</router-link></i>
                                或<i><router-link :to="{path:'/login'}">登录</router-link></i>
                            </div>
                        </template>

                    </div>
                    <!--e:发表评论-->
                </div>
                <!--e:右边-->


            </div>
            <!--e:详情内容-->

        </div>
    </div>
</template>

<script>
    $(function(){
        //点击楼内的评论进行回复
        $(".js-replay").click(function(){
            var flag = $(this).data('flag');
            var floor = $(this).data('floor');
            //console.log(floor);
            $(this).text(flag?'回复':'不回复了').data('flag',!flag);
            $(this).next().toggle(500);
            //$(this).next().addClass('box-show').parents(".box-parent").siblings().find('.box').removeClass('box-show');
        })
    });
    //import breadNav from '../components/breadNav'
    export default{
        components:{
            //breadNav
        },
        data(){
            return {
                articleId:parseInt(this.$route.params.id),   //详情页对应的id
                detailContent:{},                            //详情页的数据
                commentList:[],                              //文章的评论列表
                floorCommentList:[],                        //文章评论楼层内的评论数
                token:common.getJwtToken(),
                isShow:false,                                //‘回复’与‘请先登录’的显示与否
                replyWord:'回复',                           //‘回复’和‘收起’
                publicComment:'',                           //用户发表评论
                floorComment:''                            //楼层内回复评论
            }
        },
        mounted(){

        },
        created(){
            //1.id对应的详情页内容
            this.$http.get(common.globalUrl+'/article/bean',
                    {params:{id:this.articleId}},
                    {emulateJSON:true}
            ).then(function(res){
                this.detailContent = res.data;
            },function(error){
                this.$toast.center('请求异常，请重试')
            });

            //2.加载评论列表
            this.$http.get(common.globalUrl+'/articlecomment/list',{
                params:{articleid:this.articleId}
            },{emulateJSON:true}).then(function(res){
                this.commentList = res.data;
                for(var i=0;i<res.data.length;i++){
                    this.commentList[i].createDate = common.changeDate(this.commentList[i].createDate);

                    //3.评论楼层内的评论数
                    this.$http.get(common.globalUrl+'/articlefloorcomment/list',{
                        params:{articleid:res.data[i].id}
                    },{emulateJSON:true}).then(function(res){
                        this.floorCommentList = res.data;
                        for(var j=0;j<this.commentList.length;j++){
                            this.commentList[i][this.floorCommentList] = res.data;
                        }
                    },function(error){

                    });
                }
            },function(res){

            });
        },
        methods:{
            //1.0详情页加载、
            getDetailList(){

            },
            //2.0评论列表
            //点击‘回复’
            /*onReply(index){
                this.i = index;
                console.log(this.i);
                this.isShow = !this.isShow;
                this.replyWord = this.isShow ? '收起' : '回复';
            },*/
            //用户发表评论
            onPublicComment(){
                this.$http.post(common.globalUrl+'/userarticlecomment/add',{
                    content:this.publicComment,
                    articleid:this.articleId
                },{headers:common.createAuthorizationTokenHeader(),emulateJSON:true}).then(function(res){
                    this.$toast.center(res.data.data);
                    window.location.reload();
                },function(error){
                    this.$toast.center("评论失败，请重试");
                })
            },
            //楼层内回复评论
            onFloorComment(){
                /*this.$http.post(common.globalUrl+'/userarticlefloorcomment/add',{
                    content:this.floorComment,
                    commentid:id
                },{headers:common.createAuthorizationTokenHeader(),emulateJSON:true}).then(function(res){
                    console.log('success');
                    window.location.reload();
                },function(error){

                })*/
            }
        }
    }


</script>

<style scoped>
    .detail .main{
        width: 100%;
        box-sizing: border-box;
    }
    .detail .main .left{
        width: 20%;
        background-color: #DFE6F0;
    }
    .detail .main .right{
        width: 80%;
        background-color: #fff;
    }
    .detail .main .left{
        font-size: 14px;
        text-align: center;
    }
    .detail .main .left .user-info .img-box{
        border:1px solid #ddd;
        width: 80px;
        height: 80px;
        margin: 10px auto;
    }
    .detail .main .left .user-info .username{
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
    }
    .detail .main .left .user-info ul{
        text-align: center;
        margin: auto;
    }
    .detail .main .left .user-info ul li{
        /*float: left;*/
        display: inline-block;
        padding: 0 5px;
        font-size: 12px;
    }
    .detail .main .left .user-info ul li:not(:last-child){
        border-right:1px solid #999;
    }
    .detail .main .left .read-num,.detail .right .detail-title{
        height: 35px;
        line-height: 35px;
        background: linear-gradient(to bottom, #fff ,#f3f3f3);
    }
    .detail .main .left .read-num .number{
        font-size: 12px;
        color: #f00;
        padding-left: 5px;
    }
    .detail .right .detail-title{
        padding: 0 15px;
    }
    .detail .right .detail-title{
        font-size: 18px;
        text-align: left;
    }
    .detail-content{
        text-indent: 2em;
        font-size: 16px;;
        line-height: 24px;
        padding:10px 15px;
        word-break: break-all;
    }
    /*评论列表*/
    .commentList{
        font-size: 14px;
    }
    .commentList h4{
        border-bottom:1px solid #555;
    }
    .commentList time{
        font-size: 12px;
        margin-left: 10px;
    }
    .commentList .comment{
        padding: 20px 0 10px 40px;
        background: url(../assets/icon/comment.gif) no-repeat 0 10px;
        background-size: 32px 23px;
    }
    .commentList .reply:hover{
        color: #F54545;
    }
    .commentList .list-step{
        border-bottom:1px solid #ccc;
        padding: 5px ;
    }
    /*发表评论*/
    .publishComment h3{
        padding: 15px 0 10px;
    }
    .publishComment p{
        height: 30px;
        line-height: 30px;
    }
    .publishComment .cannot-publish{
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        font-weight: 600;
    }
    .publishComment .cannot-publish i{
        font-weight: bold;
        text-decoration: underline;
    }
    .box-hide{
        display: none;
    }
    .box-show{
        display: block;
    }
</style>
