<template>
    <div id="layer">
        <div class="layer" v-show="show" transition="layer-fade">
            <div class="layer-content">
                <slot>empty</slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Popup from '../../layer'

    export default {
        name:'layer',
        mixins: [Popup],
        methods: {
            // 响应 overlay事件
            overlayClick () {
                this.show = false;
            },
            // 响应 esc 按键事件
            escPress () {
                this.show = false;
            }
        }
    }
</script>

<style>
    .layer {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: fixed;
        width: 90%;
    }
    .layer-content {
        background: #fff;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
    }
    .layer-fade-transition {
        transition: opacity .3s linear;
    }
    .layer-fade-enter, .layer-fade-leave {
        opacity: 0;
    }
</style>
