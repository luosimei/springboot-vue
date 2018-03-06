/**
 * Created by lsm on 2018-1-24.
 */

//虽然在 main.js 中已经引入了 Vue 和 Vuex，但是这里还得再引入一次
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
   //定义初始值
    state:{
        author:'123'
    }
});

export default {
    store
}