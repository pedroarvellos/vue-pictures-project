<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotos" :key="foto.url">

          <!-- Quando ele chega aqui, ele percebe que deve trocar esta notação pelo Painel que foi declarado (meu-painel, foi declarado em components como um "apelido" para Painel). Como ele vai trocar esta tag pelo tag Painel, tudo que tiver aqui dentro, ao menos que exita um "slot", será descartado. -->
          <meu-painel :titulo="foto.titulo">
            <img class="imagem-responsiva" v-bind:src="foto.url" v-bind:alt="foto.titulo">
          </meu-painel>
        <!--Quando é atributo eu não posso fazer simplesmente a interpolação, como neste caso, que tenho os atributos da img. Neste caso, eu preciso fazer um v-bind (caso não queira escrever v-bind, posso apenas colocar : antes. -->
      </li>
    </ul>
  
  </div>
</template>

<script>
import Painel from './components/shared/painel/Painel.vue';

export default {

  components: {
    'meu-painel' : Painel 
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: []
    };
  },

  created() {
    this.$http
      .get("http://localhost:3000/v1/fotos") //HTTP executa o método GET para este endereço. Este cara vai me retornar uma promise, e nesta promise, toda vez que eu quiser obter um resultado dela, eu tenho que fazer através da chamada da função THEN.
      // //exemplo sem usar arrow function
      // .then(function (res) {
      // return res.json()})
      // .then(function (minhaListaDeFotos) {
      //   this.fotos = minhaListaDeFotos
      // }), function (err) {
      //   console.log(err)
      // }

      //usando arrow funciton (provindo do ES6)
      .then(res => res.json()) //Então eu chamo a função THEN, e digo que ele ele vai me devolver a resposta que veio do servidor (res), e digo para ele converter esta resposta para json. Ele apenas transforma os dados retornados em json.
      .then(
        minhaListaDeFotos => (this.fotos = minhaListaDeFotos),
        err => console.log(err)
      ); //eu pego a minha lista de fotos que vem da minha promise (que agora foi transformada em json), e digo que a minha lista de fotos do meu compomente data vai receber as fotos que estão vindo do servidor.
  }
};
</script>
                  
<style>
.centralizado {
  text-align: center;
}

.corpo {
  font-family: Helvetica, sans-serif;
  margin: 0 auto;
  width: 96%;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.imagem-responsiva {
  width: 100%;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}
</style>
