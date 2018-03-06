<template>
    <div id="breadNav">
        <div class="small-nav">
            <span class="bg-home">home</span>
            <ul>
                <li>首页</li>
                <li class="arrow">></li>
                <li>用户信息</li>
                <li class="arrow">></li>
                <li>个人头像</li>
            </ul>
        </div>
    </div>
</template>

<script>

</script>

<style>
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