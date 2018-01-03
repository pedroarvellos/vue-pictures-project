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

    // props: { Eu poderia fazer assim, por exemplo, definir validações dentro da minha prop.  
    //     rotas: {
    //         type:Array,
    //         required: true
    //     }
    // }
}
</script>    

<style scoped>
</style>