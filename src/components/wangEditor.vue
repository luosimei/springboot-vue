<template>
    <div id="wangEditor">
        <div id="editor">

        </div>
        <button id="btn1">button</button>
    </div>
</template>

<script type="es6">

    import E from 'wangeditor'
    export default {
        name: 'editor',
        props: {},
        data () {
            return {
                editorContent: ''
            }
        },
        mounted() {
            //var E = require('wangeditor');
            var editor = new E('#editor');
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            editor.customConfig.showLinkImg = false;// 隐藏“网络图片”tab
            // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
            editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
            //editor.customConfig.uploadImgServer = '/upload';  // 上传图片到服务器,/upload是上传图片的服务器端接口
            // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
            //editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;
            editor.customConfig.customAlert = function (info) {
                // info 是需要提示的内容
                alert('自定义提示：' + info)
            };
            editor.create();
            var json = editor.txt.getJSON()  // 获取 JSON 格式的内容
            var jsonStr = JSON.stringify(json)
            //console.log(json)
            console.log(jsonStr)
            /*document.getElementById('btn1').addEventListener('click', function () {
                //alert(editor.txt.html())
                var json = editor.txt.getJSON()  // 获取 JSON 格式的内容
                var jsonStr = JSON.stringify(json)
                //console.log(json)
                console.log(jsonStr)
            })*/
        }
    }
</script>

<style></style>