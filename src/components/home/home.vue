<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    
    <p class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input = "filtro = $event.target.value" placeholder="filtre pelo título"/> 
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComfiltro" :key="foto.url">
          <meu-painel v-bind:titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="1.1" v-bind:url="foto.url" v-bind:titulo="foto.titulo"/>  
            <router-link :to="{ name: 'altera', params: {id: foto._id} }"><meu-botao tipo="button" rotulo="ALTERAR" :confirmacao= "false" estilo=""/></router-link>
            <meu-botao tipo="button" rotulo="REMOVER" :confirmacao= "true" estilo="perigo" v-on:botaoAtivado="remover(foto)"/> 
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
        let exp = new RegExp(this.filtro.trim(), "i"); 
        return this.fotos.filter(foto => exp.test(foto.titulo)); 
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

  created() {
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
