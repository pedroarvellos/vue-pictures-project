<template>
    <nav>
      <ul>       
          <li v-for="rota in rotas" :key="rota.url">
            <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link> <!-- Aqui ele fez uma condição, se rota.path retornar true (neste caso possuir algo dentro), ele colocar o valor rota.path, se retornar false, ele coloca o valor '/'-->
            <!-- Operador ternário: é composto de duas partes, a condição e duas possibilidades, se a condição se cumpre ou não. Ex.: 1+1 = 2 ? 'right' : 'wrong'. Neste caso, antes dos dois pontos é quando a condição retorna true e depois dos dois pontos é quando retorna falso. -->
          </li>
      </ul>
    </nav>

</template>
<script>
export default {
    props: ["rotas"]
}
</script>    

<style scoped>
</style>