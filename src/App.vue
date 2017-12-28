<template>
  <div class="corpo">
    <!-- hora tem que exibir um componente, hora outro. De acordo com a rota que for acessada a minha aplicação. -->
    <router-view></router-view>
  </div>
</template>

<script>
import Painel from "./components/shared/painel/Painel.vue";
import ImagemResponsiva from "./components/shared/imagem-responsiva/ImagemResponsiva.vue";

export default {
}
</script>
                  
<style>
.corpo {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width: 96%;
}
</style>
