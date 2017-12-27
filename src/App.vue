<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    
    <input type="search" class="filtro" v-on:input = "filtro = $event.target.value" placeholder="filtre pelo título"/> <!-- Toda vez que o evento este evento v-on é disparado, ele executa da seguinte forma: pega filtro que é uma variável declarada dentro do meu data, e ele vai receber $event (objeto do vue.js), .target significa que é quem disparou o evento, e o value é o valor inserido. Resumindo, quando este evento é disparado, é colocado dentro do filtro o que está sendo digitado dinamicamente. Toda vez que estou digitando ele vai rodando este evento.-->
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComfiltro" :key="foto.url">
          <!-- Quando ele chega aqui, ele percebe que deve trocar esta notação pelo Painel que foi declarado (meu-painel, foi declarado em components como um "apelido" para Painel). Como ele vai trocar esta tag pelo tag Painel, tudo que tiver aqui dentro, ao menos que exita um "slot", será descartado. -->
          <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo">
            
          </imagem-responsiva>
          </meu-painel>
        <!--Quando é atributo eu não posso fazer simplesmente a interpolação, como neste caso, que tenho os atributos da img. Neste caso, eu preciso fazer um v-bind (caso não queira escrever v-bind, posso apenas colocar : antes. -->
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "./components/shared/painel/Painel.vue";
import ImagemResponsiva from "./components/shared/imagem-responsiva/ImagemResponsiva.vue";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: ""
    };
  },

  computed: {
    fotosComfiltro() {
      if (this.filtro) {
        //caso tenha algo para filtrar, eu filtro, senão, eu retorno a lista toda de fotos.
        let exp = new RegExp(this.filtro.trim(), "i"); //Estou criando uma expressão regular chamada exp baseada no valor digitado no filtro e usando case sensitive.
        return this.fotos.filter(foto => exp.test(foto.titulo)); //a função filter do JavaScript filtra um lista. Estou retornando uma lista filtrada baseada em uma expressão regular criada anteriormente, que recebe o objeto foto e retorna caso o título dele esteja de acordo com a regra da expressão regular.
      } else {
        return this.fotos;
      }

      // if(this.filtro) {
      //   let exp = new RegExp(this.filtro.trim(), 'i');
      //   return this.fotos.filter(function (foto) {
      //     return exp.test(foto.titulo) //estou testando se o título da foto é igual ao valor digitado pela pessoa com os espaços cortados e em case sentitive. (this.filtro.trim(), 'i')
      //   });//test retorna true ou false. Ao jogar a legenda da imagem, eu encontrei este padrão definido na expressão regular ou não? É true ou é false?
      // } else {
      //   return this.fotos;
      // }
    }
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

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
