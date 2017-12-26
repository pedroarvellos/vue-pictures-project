import Vue from 'vue' //vue é um módulo no qual nós importamos o Global View Object Vue. 
import App from './App.vue'

import VueResource from 'vue-resource'; //Estou importando o meu vue-resource que baixei como dependência pelo prompt, a partir do comando npm install. Esta dependência será utilizada para eu consumir os dados da minha API.
//O vue-resource é aquele que disponibiliza artefatos especializados na realização de requisições assíncronas ao mesmo tempo em que se integra com o ecossistema do Vue.
Vue.use(VueResource); //Estou agora dizendo para o VUE utilizar do meu pacote. 

new Vue({ //Esta é uma Vue instance, que foi criada a partir do Global View Object, para renderizar um componente em index.html
  el: '#app',
  render: h => h(App) //App está sendo importando do App.vue
})