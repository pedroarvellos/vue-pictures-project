<template>
  <div class="corpo">
    <meu-menu :rotas="routes"/> <!--Estou passando o dado routes para "rotas" em Menu, para que ele possa usar este dado do pai.-->
    <!-- hora tem que exibir um componente, hora outro. De acordo com a rota que for acessada a minha aplicação. -->
    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {

  components: {
    'meu-menu' : Menu
  },

  data() {
    return {
      routes: routes
    }
  }
};
</script>
                  
<style>
.corpo {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width: 96%;
}

.pagina-enter, .pagina-leave-active {
    opacity: 0;
} 

.pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s; /*.4s = 400 milisegundos, 4s = 2 segundos*/
} 
</style>
