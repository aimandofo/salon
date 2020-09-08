// eslint-disable-next-line vue/valid-v-else
import Vue from 'vue'
import Router from 'vue-router';
import Index from '../page/Index';
import Blogs from '../page/Blogs';
import BlogsDetail from '../page/BlogsDetail';
import GoodsDetail from '../page/GoodsDetail';
import GoodsBrowse from '../page/GoodsBrowse';
import WorkInfo from '../page/WorkInfo';
import ShopInfo from '../page/ShopInfo';
import CartList from '../page/CartList';
import HairstyleIdeas from '../page/HairstyleIdeas';
import Reservation from '../page/Reservation';
import MyHairstyle from '../page/MyHairstyle';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/BlogsDetail',
      name: 'BlogsDetail',
      component: BlogsDetail
    },
    {
      path: '/GoodsDetail',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/GoodsBrowse',
      name: 'GoodsBrowse',
      component: GoodsBrowse
    },
    {
      path: '/WorkInfo',
      name: 'WorkInfo',
      component: WorkInfo
    },
    {
      path: '/ShopInfo',
      name: 'ShopInfo',
      component: ShopInfo
    },
    {
      path: '/CartList',
      name: 'CartList',
      component: CartList
    },
    {
      path: '/HairstyleIdeas',
      name: 'HairstyleIdeas',
      component: HairstyleIdeas
    },
    {
      path: '/Reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/MyHairstyle',
      name: 'MyHairstyle',
      component: MyHairstyle
    }
  ]
})
