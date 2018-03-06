// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import  Vuex from 'vuex';

import Layout from './components/layout';//项目的入口文件
import indexPage from './pages/index';
import detailPage from './pages/detail';
import register from './pages/register';
import login from './pages/login';
import me from './pages/me';
import friend from './pages/friend';
import post from './pages/post';
//js的引入
import $ from 'jquery';
import common from './js/common.js';
global.common = common; //暴露为全局变量

import store from './js/store'
import jwt from './js/jwt-decode.min'

import './css/toast.css';
import Toast from './js/toast';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Toast);


const router = new VueRouter({
  //mode:'history',       //  “/#”开启了history模式，而history模式需要服务器支持???
  history: false,
  hashbang:true,
  routes:[
    {
      path:'/',
      name:'login',
      component:login
    },{
      path:'/login',
      redirect:'/',
      name:'login',
      component:login
    },{
      path:'/index',
      name:'indexPage',
      component:indexPage
    },{
      path:'/register',
      name:'register',
      component:register
    },{
      path:'/detail/:id',
      name:'detailPage',
      component:detailPage
    },{
      path:'/me',
      name:'me',
      component:me
    },{
      path:'/friend',
      name:'friend',
      component:friend
    },{
      path:'/post',
      name:'post',
      component:post
    }
  ]
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',  //index.html页面中的挂载点id="#app"
  router,       //使用路由
  template: '<Layout/>',  //入口文件的节点
  components: { Layout }  //入口文件的组件名称

});


