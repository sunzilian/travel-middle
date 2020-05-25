import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import mainLayout from '../components/mainLayout'

const routerMethods = ['push', 'replace']
routerMethods.forEach(method => {
  const originalCall = VueRouter.prototype[method]
  VueRouter.prototype[method] = function (location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject);
    }
    return originalCall.call(this, location).catch(err => err);
  };
});


Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    redirect: '/news'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    name: 'user',
    path: '/user',
    redirect: '/user',
    component: mainLayout,
    children: [
      {
        name: 'user',
        path: '',
        component: () => import( /* webpackChunkName: "user" */ '../views/User.vue')
      },
    ]
  },
  {
    name: 'news',
    path: '/news',
    redirect: '/news',
    component: mainLayout,
    children: [
      {
        name: 'newsList',
        path: '',
        component: () => import( /* webpackChunkName: "newsList" */ '../views/NewsList.vue')
      },
      {
        name: 'newsDetail',
        path: '/newsDetail',
        component: () => import( /* webpackChunkName: "newsDetail" */ '../views/NewsDetail.vue')
      },
      {
        name: 'newsAdd',
        path: '/newsAdd',
        component: () => import( /* webpackChunkName: "newsAdd" */ '../views/NewsAdd.vue')
      },
      {
        name: 'newsEdit',
        path: '/newsEdit',
        component: () => import( /* webpackChunkName: "newsEdit" */ '../views/NewsEdit.vue')
      },
    ]
  },
  {
    name: 'scenicspot',
    path: '/scenicspot',
    redirect: '/scenicspot',
    component: mainLayout,
    children: [{
        name: 'scenicspotList',
        path: '',
        component: () => import( /* webpackChunkName: "scenicspotList" */ '../views/ScenicspotList.vue')
      },
      {
        name: 'scenicspotDetail',
        path: '/scenicspotDetail',
        component: () => import( /* webpackChunkName: "scenicspotDetail" */ '../views/ScenicspotDetail.vue')
      },
      {
        name: 'scenicspotAdd',
        path: '/scenicspotAdd',
        component: () => import( /* webpackChunkName: "scenicspotAdd" */ '../views/ScenicspotAdd.vue')
      },
      {
        name: 'scenicspotEdit',
        path: '/scenicspotEdit',
        component: () => import( /* webpackChunkName: "scenicspotEdit" */ '../views/ScenicspotEdit.vue')
      },
    ]
  },
  {
    name: 'scenicspotType',
    path: '/scenicspotType',
    redirect: '/scenicspotType',
    component: mainLayout,
    children: [
      {
        name: 'scenicspotTypeList',
        path: '',
        component: () => import( /* webpackChunkName: "scenicspotTypeList" */ '../views/ScenicspotTypeList.vue')
      },
      {
        name: 'scenicspotTypeDetail',
        path: '/scenicspotTypeDetail',
        component: () => import( /* webpackChunkName: "scenicspotTypeDetail" */ '../views/ScenicspotTypeDetail.vue')
      },
      {
        name: 'scenicspotTypeAdd',
        path: '/scenicspotTypeAdd',
        component: () => import( /* webpackChunkName: "scenicspotTypeAdd" */ '../views/ScenicspotTypeAdd.vue')
      },
      {
        name: 'scenicspotTypeEdit',
        path: '/scenicspotTypeEdit',
        component: () => import( /* webpackChunkName: "scenicspotTypeEdit" */ '../views/ScenicspotTypeEdit.vue')
      },
    ]
  },
  {
    name: 'changePassword',
    path: '/changePassword',
    redirect: '/changePassword',
    component: mainLayout,
    children: [
      {
        name: '',
        path: '',
        component: () => import( /* webpackChunkName: "changePassword" */ '../views/ChangePassword.vue')
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
