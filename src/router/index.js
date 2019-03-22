// import Vue from 'vue'
// import Router from 'vue-router'
// const Vue = require('vue')
// const Router = require('vue-router')
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

// Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '示例',
  //   icon: 'zujian',
  //   children: [
  //     { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
  //   ]
  // },

  {
    path: '/constant',
    component: Layout,
    redirect: '/constant/index',
    icon: 'zujian',
    noDropdown: true,
    children: [
      { path: 'index', name: '服务器参数', component: _import('constant/index'), meta: { role: ['admin'] }}
    ]
  },

  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/index',
    icon: 'yonghuming',
    noDropdown: true,
    children: [
      { path: 'index', name: '代理管理', component: _import('agent/index'), meta: { role: ['delegate'] }},
      // { path: 'record/:id(\\d+)', name: 'test', component: _import('agent/record'), meta: { role: ['delegate'] }}
      // { path: 'record/:id(\\d+)',  name: ' 记录', component: _import('agent/record'), meta: { role: ['delegate'] }},
      { path: 'record', name: 'record', component: _import('agent/record'), meta: { role: ['delegate'] }}
      // { path: 'record', component: () => import('/views/agent/record'), name: 'record' }
    ]
  },
  {
    path: '/player',
    component: Layout,
    redirect: '/player/index',
    icon: 'yonghuming',
    noDropdown: true,
    children: [
      { path: 'index', name: '玩家管理', component: _import('player/index'), meta: { role: ['delegate'] }}
    ]
  },
  {
    path: '/charge',
    component: Layout,
    redirect: '/charge/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'index', name: '充值管理', component: _import('charge/index'), meta: { role: ['delegate'] }}
    ]
  },

  {
    path: '/playercharge',
    component: Layout,
    redirect: '/playercharge/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'index', name: '充值记录', component: _import('playercharge/index'), meta: { role: ['delegate'] }}
    ]
  },

  {
    path: '/agentcharge',
    component: Layout,
    redirect: '/agentcharge/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'index', name: '代理充值', component: _import('agentcharge/index'), meta: { role: ['delegate'] }}
    ]
  },

  {
    path: '/person',
    component: Layout,
    redirect: '/person/index',
    icon: 'yonghuming',
    noDropdown: true,
    children: [
      { path: 'index', name: '个人信息', component: _import('person/index'), meta: { role: ['delegate'] }}
    ]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/GoodList',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'GoodList', name: '商品管理', component: _import('goods/GoodList'), meta: { role: ['admin'] }}
    ]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/AddGoods',
    icon: 'tubiao',
    noDropdown: true,
    hidden: true,
    children: [
      { path: 'AddGoods', name: '添加商品', component: _import('goods/AddGoods'), meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/exchange',
    component: Layout,
    redirect: '/exchange/ExchangeList',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'ExchangeList', name: '兑换列表', component: _import('exchange/ExchangeList'), meta: { role: ['delegate'] }}
    ]
  },
  {
    path: '/game',
    component: Layout,
    redirect: '/game/gameNotice',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'GameNotice', name: '游戏公告', component: _import('game/gameNotice'), meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activityList',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'ActivityList', name: '图文管理', component: _import('activity/activityList')}
    ]
  },
  {
    path: '/share',
    component: Layout,
    redirect: '/share/share',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'Share', name: '分享设置', component: _import('share/share'), meta: { role: ['admin'] }}
    ]
  },
  {
    path: '/withdraw',
    component: Layout,
    redirect: '/withdraw/withdraw',
    icon: 'tubiao',
    noDropdown: true,
    children: [
      { path: 'Withdraw', name: '提现列表', component: _import('withdraw/withdraw'), meta: { role: ['admin'] }}
    ]
  },
  // {
  //   path: '/wx',
  //   component: Layout,
  //   redirect: '/wx/index',
  //   icon: 'yonghuming',
  //   noDropdown: true,
  //   children: [
  //     { path: 'index', name: '微信', component: _import('wx/index'), meta: { role: ['admin'] }}
  //   ]
  // },

  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/agent/test',
  //   icon: 'tubiao',
  //   noDropdown: true,
  //   children: [
  //     { path: 'test', name: 'test', component: _import('agent/test'), meta: { role: ['admin'] }}
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
