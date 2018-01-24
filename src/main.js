import Vue from 'vue' 
import App from './App.vue'
import VueResource from 'vue-resource'; 

import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import { routes } from './routes'; 

import './directives/Transform';
import msg from './pt_BR';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/dist/jquery.js';

import './assets/css/meu-css.css'; 
import './assets/js/meu-js.js'; 

Vue.use(VueResource); 
Vue.http.options.root = 'http://localhost:3000'
Vue.use(VueRouter);


const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

Vue.use(VeeValidate, { 
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({ 
  el: '#app',
  router: router,
  render: h => h(App)
})