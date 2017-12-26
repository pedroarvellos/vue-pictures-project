<template>
  <div>
    <h1> {{ titulo }}</h1>

    <ul>
      <li v-for="foto of fotos">
        <img v-bind:src="foto.url" v-bind:alt="foto.titulo">  <!-- Quando é atributo eu não posso fazer simplesmente a interpolação, como neste caso, que tenho os atributos da img. Neste caso, eu preciso fazer um v-bind (caso não queira escrever v-bind, posso apenas colocar : antes. -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      titulo: 'Alurapic',
      fotos: [
        {
          url: "http://tudosobrecachorros.com.br/wp-content/uploads/remedios-proibidos-cachorro-766x526.jpg",
          titulo: "cachorro1"
      },
        {
        url: "http://tudosobrecachorros.com.br/wp-content/uploads/remedios-proibidos-cachorro-766x526.jpg",
        titulo: "cachorro2"
      }],
    }
  }
}
</script>

<style>
</style>
