<template>
    <div id="indexComponents">
        <div>
            <!--s:面包屑组件-->
            <div class="small-nav">
                <span class="bg-home">home</span>
                <ul>
                    <li>首页</li>
                </ul>
            </div>
            <!--e:面包屑组件-->

            <div class="index-content">
                <!--s:发帖和分页-->
                <div class="operate clearfix">
                    <button class="btn mouse fl" @click="onPost">发布新帖</button>
                    <!--s:分页-->
                    <template>
                        <div class="list fr">
                            <template v-if="count">
                                <ul>
                                    <li v-for="item in items">...</li>
                                </ul>
                                <mo-paging
                                        :page-index="currentPage"
                                        :total="count"
                                        :page-size="pageSize"
                                        @change="pageChange">
                                </mo-paging>
                            </template>
                        </div>
                    </template>
                    <!--e:分页-->
                </div>
                <!--e:发帖和分页-->

                <!--s:列表有数据-->
                <div v-if="articleList">
                    <div class="article-list">
                        <table>
                            <thead>
                            <tr>
                                <td class="font-blue">帖子列表</td>
                                <td class="author">作者</td>
                                <td class="record">浏览记录</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in articleList">
                                <td>
                                    <router-link :to="{path:'/detail/'+item.id}">
                                        <span>{{item.title}}</span>
                                        <span class="label font-blue">{{item.lable}}</span>
                                    </router-link>
                                </td>
                                <td>
                                    <a class="font-blue" href="">{{item.userId}}</a>
                                    <div>{{item.createDate}}</div>
                                </td>
                                <td>{{readCount}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--e:列表有数据-->
                <!--s:列表无数据-->
                <div class="no-list" v-else>
                    <p>没有文章列表，去发帖吧</p>
                </div>
                <!--e:列表无数据-->

                <!--s:发帖和分页-->
                <div class="operate clearfix">
                    <button class="btn mouse fl" @click="onPost">发布新帖</button>
                    <!--s:分页-->
                    <template>
                        <div class="list fr">
                            <template v-if="count">
                                <ul>
                                    <li v-for="item in items">...</li>
                                </ul>
                                <mo-paging
                                        :page-index="currentPage"
                                        :total="count"
                                        :page-size="pageSize"
                                        @change="pageChange">
                                </mo-paging>
                            </template>
                        </div>
                    </template>
                    <!--e:分页-->
                </div>
                <!--e:发帖和分页-->
            </div>

        </div>
    </div>
</template>

<script>
    //import breadNav from "../components/breadNav"
    import moPaging from '../components/moPaging'
    export default {
        name:'indexComponents',
        components:{
            //breadNav,
            moPaging
        },
        data (){
            return {
                pageSize : 10 , //每页显示10条数据
                currentPage : 1, //当前页码
                count : 0, //总记录数
                items : [],
                readCount:0,
                articleList:[]
            }
        },
        created(){
            //console.log(this.page);
            //请求列表数据
            /*this.$http.get(common.globalUrl+'/article/page',{
                params:{
                    page:this.page,
                    size:10
                }
            }, {headers:common.createAuthorizationTokenHeader()}).then(function(res){
                console.log(res);
                this.pTotal = res.data.totalPages;
                this.articleList = res.data.content;
                //数据库的时间是时间戳，转换为标准时间格式显示
                for(var i=0;i<res.data.content.length;i++){
                    this.articleList[i].createDate = changeDate(res.data.content[i].createDate);
                }
                //判断‘下一页’是否存在
                if(!res.data.last){
                    this.hasLast = true;
                }else{
                    this.hasLast = false;
                }
            },function(error){
                this.$toast.center('文章获取异常，请刷新')
            });*/
        },
        mounted(){
            //请求第一页数据
            this.getList();
        },
        watch:{

        },
        computed:{

        },
        methods:{
            //1.分页数据
            getList(){
                this.$http.get(common.globalUrl+'/article/page',{
                    params:{
                        page:this.currentPage,  //接口传递数据默认page:0是第1页
                        size:this.pageSize
                    }
                },{emulateJSON:true}).then(function(res){
                    this.articleList = res.data.content;
                    this.count = res.data.totalElements;
                    //this.items = res.body.content;
                    //数据库的时间是时间戳，转换为标准时间格式显示
                    for(var i=0;i<res.data.content.length;i++){
                        this.articleList[i].createDate = common.changeDate(res.data.content[i].createDate);
                    }
                },function(error){

                })
            },
            //从page组件传递过来的当前page
            pageChange (page) {
                this.currentPage = page;
                this.getList();
            },

            //2.点击‘发布新帖’
            onPost(){
                var token = common.getJwtToken();
                if(token){
                    this.$router.push({path:'/post',replace:true});
                }else{
                    this.$toast.center('登录后才能发帖哦')
                }
            }
        }
    }




</script>

<style>

    .index-content{

    }
    .index-content .operate{
        height: 50px;
    }
    .index-content .operate button{
        margin-top: 8px;
    }
    .article-list{
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
    }
    .article-list table{
        width: 100%;
    }
    .article-list table thead{
        background-color: #f2f2f2;
        border-bottom:1px solid #C3C3C4;
    }
    .article-list table tr{
        border-bottom:1px dotted #ddd;
    }
    .article-list table tr td{
        padding: 10px 5px;
        vertical-align: middle;
    }
    .article-list table tr td:first-child{
        width: 78%;
        text-align: left;
        font-size: 14px;
    }
    .article-list table tr td:last-child{
        width: 8%;
    }
    .article-list table tr td:not(:first-child){
        text-align: center;
        font-size: 12px;
    }
    .label{
        display: inline-block;
        padding:0 3px;
        margin-left: 3px;
        border:1px solid #369;
        font-size: 12px;
        border-radius: 12px;
        -webkit-border-radius: 12px;
        -moz-border-radius: 12px;
    }
    .author ,.record{
        font-size: 12px;
        padding-right: 10px;
    }
    .next-page{
        background-color: #f2f2f2;
        text-align: center;
        border:1px solid #C2D5E3;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
    }
    .no-list{
        text-align: center;
        font-size: 16px;
    }

</style>