<template>
    <div id="post">
        <!--面包屑导航-->
        <div class="small-nav">
            <span class="bg-home">home</span>
            <ul>
                <li>首页</li>
                <li class="arrow">></li>
                <li>用户发帖</li>
            </ul>
        </div>
        <div class="post-box">
            <div class="post post-title">
                <span>发布标题：</span>
                <input type="text" placeholder="1~50字的标题" v-model="title"/>
            </div>
            <div class="post">
                <span>所属标签：</span>
                <input type="text" placeholder="4位数以上的标签"  v-model="lable"/>
            </div>
            <div class="post">
                <div id="WangEditor"></div>
            </div>
            <div class="post">
            <button class="mouse" @click="onPost">确认发帖</button>
            </div>
        </div>
    </div>
</template>

<script>
    /*window.onload = function(){
        var E = require('wangeditor');
        var editor = new E('#editor');
        editor.customConfig.showLinkImg = false;// 隐藏“网络图片”tab
        // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
        editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
        //editor.customConfig.uploadImgServer = '/upload';  // 上传图片到服务器,/upload是上传图片的服务器端接口
        // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
        editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;
        editor.customConfig.customAlert = function (info) {
            // info 是需要提示的内容
            alert('自定义提示：' + info)
        };
        editor.create();
    };*/

    //import breadNav from '../components/breadNav'
    import WangEditor from 'wangeditor'
    export default{
        name:'post',
        components:{
           // breadNav
        },
        data(){
            return{
                title:'',
                lable:'',
                content:''
            }
        },
        mounted(){
            let that = this;
            this.editor = new WangEditor('#WangEditor');  //这个地方传入div元素的id 需要加#号
            this.editor.customConfig.showLinkImg = false;// 隐藏“网络图片”tab
            // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
            this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
            //editor.customConfig.uploadImgServer = '/upload';  // 上传图片到服务器,/upload是上传图片的服务器端接口
            //editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;   通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
            this.editor.customConfig.customAlert = function (info) {
                alert('自定义提示：' + info);  // info 是需要提示的内容
            };
            // 配置 onchange 事件
            this.editor.change = function () {          // 这里是change 不是官方文档中的 onchange
                // 编辑区域内容变化时，实时打印出当前内容
                //console.log(this.txt.html())
                /*var json = editor.txt.getJSON()  // 获取 JSON 格式的内容
                var jsonStr = JSON.stringify(json)
                console.log(json)
                console.log(jsonStr)*/
                that.content = this.txt.html()
            };
            this.editor.create();     // 生成编辑器

        },
        methods:{
            onPost(){
                if(this.title.length<4 || this.lable.length<4||this.content.length<4){
                    this.$toast.center('数字不符合要求')
                }else{
                    this.$http.post(common.globalUrl+'/userarticle/add',{
                        title:this.title,
                        lable:this.lable,
                        content:this.content
                    },{headers:common.createAuthorizationTokenHeader(),emulateJSON:true}).then(function(res){
                        this.$toast.center(res.data.data);
                        this.title = '';
                        this.label = '';
                        this.content = '';
                        setTimeout(this.$router.push({path:'/me',replace:true}),2000)
                    },function(error){
                        this.$toast.center('发帖失败，请重试')
                    })
                }
            }
        }
    }


</script>

<style scoped>
    .post-box{
        padding:20px;
    }
    .post-box .post{
        padding-bottom: 20px;
    }
    .post-box .post input[type='text']{
        width: 500px;
        height: 25px;
        outline:none;
    }
    .post-box button{
        padding: 10px;
        background-color: #0074D9;
        color: #fff;
        border-radius: 3px;
    }
    .post-box .post:last-child{
        text-align: center;
    }
</style>