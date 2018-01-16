import Vue from 'vue' //vue é um módulo no qual nós importamos o Global View Object Vue. 
import App from './App.vue'
import VueResource from 'vue-resource'; //Estou importando o meu vue-resource que baixei como dependência pelo prompt, a partir do comando npm install. Esta dependência será utilizada para eu consumir os dados da minha API.
//O vue-resource é aquele que disponibiliza artefatos especializados na realização de requisições assíncronas ao mesmo tempo em que se integra com o ecossistema do Vue.
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import { routes } from './routes'; //Com o auxílio do VueRouter, eu vou passar as rotas configuradas de routes para ele, e ele vai me devolver um roteador que será usado pela minha aplicação.
//Quando dentro do componente eu não uso export default, como dentro das páginas vue, eu preciso colocar '{}'
import './directives/Transform';
import msg from './pt_BR';

import 'bootstrap/dist/css/bootstrap.css';//importando o CSS do bootstrap para ser gerado no bandle junto aos outros módulos todos. Para isto, eu preciso mexer na configuração do meu webpack.config e mostrar para ele como eu devo carregar qualquer CSS.
import 'bootstrap/dist/js/bootstrap.js';//Mesma coisa, porém é do bootstrap. 
import 'jquery/dist/jquery.js';//Mesma coisa, porém é do bootstrap. 

import './assets/css/meu-css.css'; //Para importar meu próprio CSS eu faço desta forma, assim eu sobreponho o CSS do bootstrap. Este é um exemplo.
import './assets/js/meu-js.js'; //Para importar meu próprio JS eu faço desta forma, assim eu sobreponho o JS do bootstrap. Este é um exemplo.

Vue.use(VueResource); //Estou agora dizendo para o VUE utilizar do meu pacote. 
Vue.http.options.root = 'http://localhost:3000'//estou definindo o meu endereço raiz que será utilizando por default pelo meu http.
Vue.use(VueRouter);


const router = new VueRouter({
  routes: routes,
  mode: 'history' //Quando eu coloco mode: 'history', ele permite eu acessar os endereços sem ter previamente o valor /#/. 
});

Vue.use(VeeValidate, { //estou falando que o meu VeeValidate vai usar esta configuração, no caso, em português. Para isto, eu preciso pegar o idioma lá em vueproject/node_modules/vee-validate/dist/locale/pt_BR.js e colocar na pasta SRC. Daí eu importo ele aqui no main.js e faço um use nele. 
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

new Vue({ //Este é a View Instance do Global View Object
  el: '#app',
  router: router,
  render: h => h(App) //App está sendo importando do App.vue
})



//Recapitulando sobre as rotas:
// *Importei o VueRouter:  import VueRouter from 'vue-router';
// *Importei as rotas: import { routes } from './routes';
// *Registrei o uso do VueRouter: Vue.use(VueRouter);
// *Com o VueRouter criei uma instâcia de router passando como parâmetro as rotas que configurei na minha aplicação: const router = new VueRouter(routes: routes});
//*De posse deste router que tem todas as rotas mapeadas, eu associo ele a minha Vue instance do Global View Object: new Vue({ //Este é a View Instance do Global View Objectel: '#app', router: router, render: h => h(App) //App está sendo importando do App.vue})
//*Mas isto tudo não é suficiente para fazer cada hora um componente aparecer na minha App.vue. Eu preciso lá, dentro de template, indicar onde será cada hora um elemento aparecido. Este componente é o router-view.