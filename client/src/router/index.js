import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Overview from '@/views/Overview.vue';
import Products from '@/views/Products.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [{
      path: 'products',
      name: 'Dashboard Products',
      component: Products,
    }, {
      path: 'overview',
      name: 'Dashboard Overview',
      component: Overview,
    }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
