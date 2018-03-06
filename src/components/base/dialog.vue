<template>
    <div id="myDialog">
        <div class="masker" v-if="isShow"  @click="closeMyself"></div>
        <transition name="drop">
            <div class="my-dialog" v-if="isShow">
                <span class="close mouse" @click="closeMyself">×</span>
                <slot>empty</slot>
            </div>
        </transition>

    </div>
</template>

<script>
    export default{
        props:{
            isShow:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {

            }
        },
        methods:{
            closeMyself(){
                this.$emit('on-close')
            }
        }
    }
</script>

<style>
    .drop-enter-active{
        transition: all .5s ease;
    }
    .drop-leave-active{
        transition: all .2s ease;
        transform: translateY(-500px);
    }
    .drop-enter{
        transform: translateY(-500px);
    }
    .masker{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        position: fixed;
        top:0;
        left:0;
    }
    .my-dialog{
        position: fixed;
        top:30%;
        left: 50%;
        width: 400px;
        margin-left: -200px;
        padding: 10px;
        background-color: #fff;
    }
    .close{
        position: absolute;
        top:10px;
        right:15px;
        font-size: 16px;
        font-weight: bold;
    }
</style>