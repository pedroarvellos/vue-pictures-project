<template>
    <nav>
      <ul>       
          <li v-for="rota in rotas" :key="rota.url">
            <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link> 
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