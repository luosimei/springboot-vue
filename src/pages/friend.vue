<template>
    <div id="friend">
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
        <!--s:好友列表-->
        <div class="friendList">
            <div class="search">
                <!--搜索-->
                <div class="search-friend clearfix">
                    <input class="fl" type="search" placeholder="搜索的用户名" v-model="keyWord">
                    <button class="ope-btn mouse fl" @click="onSearchFriend">搜索</button>
                </div>
                <!--搜索结果-->
                <template>
                    <div>搜索结果:</div>
                    <div class="no-result">暂无搜索结果</div>
                </template>
            </div>
            <!--好友列表-->
            <div>
                <!--1.0通过的好友列表-->
                <div class="passFriend">
                    <template v-if="friendList">
                        <div class="clearfix" v-for="item in friendList">
                            <div class="user-box fl">
                                <div class="imgbox">
                                    <img src="../assets/icon/head_portrait.png" width="100%" height="100%" alt="">
                                </div>
                                <p class="name">用户名</p>
                                <button class="ope-btn">加为好友</button>
                            </div>
                        </div>
                    </template>

                    <div v-else>暂无好友列表</div>

                </div>
                <!--1.1待通过的好友列表-->
                <div class="waitFriend"></div>
                <!--1.2拉黑的好友列表-->
                <div class="blackFriend"></div>
            </div>


        </div>
        <!--e:好友列表-->
    </div>
</template>

<script>
    export default{
        name:'friend',
        data(){
            return {
                keyWord:'',      //搜索用户关键词
                friendList:[]    //好友列表
            }
        },
        mounted(){
            this.getFriendList();
        },
        methods:{
            //1.0搜索用户
            onSearchFriend(){
                this.$http.get(common.globalUrl+'/user/keyuser',{
                    params:{key:this.keyWord}
                },{emulateJSON:true}).then(function(res){
                    //console.log('success');
                },function(error){

                });
            },
            //2.0好友列表
            getFriendList(){
                this.$http.get(common.globalUrl+'/userrelationship/s2list',{headers:common.createAuthorizationTokenHeader(),emulateJSON:true}).then(function(res){
                    this.friendList = res.data;
                },function(error){

                })
            },
            //3.0
        }

    }
</script>

<style>
    /*搜索*/
    .search-friend{
        margin: 10px ;
    }
    .search-friend .search{
        margin-top: 40px;
        box-shadow: 8px 16px 6px rgba(0,0,0,.4);
    }
    .search-friend input{
        width: 220px;
        height: 31px;
        outline: none;
    }
    .search-friend .ope-btn{
        border:1px solid #2D4060;
        display: inline-block;
        padding: 0 20px;
        height: 31px;
        background: #2D4060 ;
        color:#fff;
    }
    /*没有搜索结果*/
    .no-result{
        text-align: center;
        font-size: 16px;
        color: #999;
    }
    /*用户列表*/
    .user-box{
        border:1px solid #e4e4e4;
        width: 80px;
        height: auto;
        text-align: center;
        padding: 10px;
        margin: 10px;
    }
    .user-box .imgbox{
        width: 60px;
        height: 60px;
        text-align: center;
        margin: auto;
    }
    .user-box .name{
        font-size: 14px;
        height: 32px;
        line-height: 32px;
    }
    .user-box button.ope-btn{
        font-size: 12px;
        padding: 5px 10px;
        background-color: #314665;
        color: #fff;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
    }
</style>