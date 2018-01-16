<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    
    <p class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input = "filtro = $event.target.value" placeholder="filtre pelo título"/> <!-- Toda vez que o evento este evento v-on:input é disparado, ele executa da seguinte forma: pega filtro que é uma variável declarada dentro do meu data, e ele vai receber $event (objeto do vue.js), .target significa que é quem disparou o evento, e o value é o valor inserido. Resumindo, quando este evento é disparado, é colocado dentro do filtro o que está sendo digitado dinamicamente. Toda vez que estou digitando ele vai rodando este evento.-->
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComfiltro" :key="foto.url">
          <meu-painel v-bind:titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="1.1" v-bind:url="foto.url" v-bind:titulo="foto.titulo"/>  
            <router-link :to="{ name: 'altera', params: {id: foto._id} }"><meu-botao tipo="button" rotulo="ALTERAR" :confirmacao= "false" estilo=""/></router-link>
            <meu-botao tipo="button" rotulo="REMOVER" :confirmacao= "true" estilo="perigo" v-on:botaoAtivado="remover(foto)"/> <!-- Atenção, não estou fazendo data binding aqui, estou passando direto a STRING com o botao para os parametros mencionados-->
            <!--Atenção, se eu estou passando um valor direto para Botao através de confirmacao que será um prop que existirá lá, por que eu não faço como nos outros e coloco sem o v-bind? Porque se eu mandar sem v-bind, ele envia o valor como String, e quando eu verificar lá no Botao no método para ver se preciso confirmar, ele vai ser verdadeiro, porque quando eu faço um if em alguma string, só dá falso se não tiver nada. Então quando eu uso o v-bind antes de enviar, ele analisa o que está sendo enviado e seta o tipo dele, neste caso ele perceberá que é um boleano. Eu só passo o valor sem o v-bind quando eu quero receber ele como String.-->
          </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";

import FotoService from "../../domain/foto/FotoService";

import Transform from "../../directives/Transform.js";

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao
  },

  directives: {
    //definindo minhas diretivas que serão utilizadas.
    "meu-transform": Transform
  },

  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
      mensagem: ""
    };
  },

  computed: {
    fotosComfiltro() {
      if (this.filtro) {
        //caso tenha algo para filtrar, eu filtro, senão, eu retorno a lista toda de fotos.
        let exp = new RegExp(this.filtro.trim(), "i"); //Estou criando uma expressão regular chamada exp baseada no valor digitado no filtro e usando case insensitive.
        return this.fotos.filter(foto => exp.test(foto.titulo)); //a função filter do JavaScript filtra um lista. Estou retornando uma lista filtrada baseada em uma expressão regular criada anteriormente, que recebe o objeto foto e retorna caso o título dele esteja de acordo com a regra da expressão regular.
      } else {
        return this.fotos;
      }
    }
  },

  methods: {
    remover(foto) {
      this.service
      .apaga(foto._id)
      .then(() => {
        let indice = this.fotos.indexOf(foto);
        this.fotos.splice(indice, 1);
        this.mensagem = "Foto removida com sucesso";
      }, err => (this.mensagem = err.message));
    }
  },

  //O método created é executado assim que meu componente é criado. Então neste caso, ele já executa o query para trazer as imagens e cria o meu componente resource para utilizar neste componente pelos outros métodos resource http.
  created() {
    // criando uma instância do nosso serviço que depende de $resource
    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(
        fotos => (this.fotos = fotos),
        err => (this.mensagem = err.message)
      );
  }
};
</script>
                  
<style>
.centralizado {
  text-align: center;
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
