import Vue from 'vue';
import Router from 'vue-router';

import Main from './pages/Main.vue';
import About from './pages/About.vue';
import Map from './pages/Map.vue';
// import Profile from './components/Login/Profile.vue';
import LogIn from './pages/LogIn.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/', component: Main },
      { path: '/about', component: About },
      { path: '/map', component: Map },
      { path: '/login', component: LogIn },
      { path: '/profile', component: () => import('./components/Login/Profile.vue') },
      { path: '/species', component: () => import('./pages/Species.vue') },
    ]
  });

  router.beforeEach((to, from, next) => {
    // const publicPages = ['/login', '/register', '/home', '/'];
    // const authRequired = !publicPages.includes(to.path);
    const restrictedPages = ['/species'] ;
    const authRequired = restrictedPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });