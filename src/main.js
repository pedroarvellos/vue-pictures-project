import Vue from 'vue' //vue é um módulo no qual nós importamos o Global View Object Vue. 
import App from './App.vue'
import VueResource from 'vue-resource'; //Estou importando o meu vue-resource que baixei como dependência pelo prompt, a partir do comando npm install. Esta dependência será utilizada para eu consumir os dados da minha API.
//O vue-resource é aquele que disponibiliza artefatos especializados na realização de requisições assíncronas ao mesmo tempo em que se integra com o ecossistema do Vue.
import VueRouter from 'vue-router';
import { routes } from './routes'; //Com o auxílio do VueRouter, eu vou passar as rotas configuradas de routes para ele, e ele vai me devolver um roteador que será usado pela minha aplicação.
//Quando dentro do componente eu não uso export default, como dentro das páginas vue, eu preciso colocar '{}'
import './directives/Transform';

Vue.use(VueResource); //Estou agora dizendo para o VUE utilizar do meu pacote. 
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  mode: 'history' //Quando eu coloco mode: 'history', ele permite eu acessar os endereços sem ter previamente o valor /#/. 
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