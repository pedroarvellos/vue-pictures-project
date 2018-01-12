<template>
    <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"> {{ foto.titulo }}</h2>

    <!--Aqui estou usando um databinding bidirecional, pois os dados fluem da view para a fonte de dados e da fonte de dados para a view. -->
    <form @submit.prevent="grava()"><!-- O comportamento padrão do formulário quando eu dou um submit é recarregar a página. Porém, não quero isto, pois eu tenho uma single page application. Sendo assim, eu preciso modificar o comportamento padrão do método para não recarregar (eu coloco .prevent, e ele cancela o comportamento padrão do meu formulário).-->
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input id="titulo" autocomplete="off" v-model.lazy="foto.titulo"> <!--Estou trazendo o valor digitado dentro de foto pois eu quero limpar o campo -->
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url"> <!-- O .lazy faz com que o two way databinding seja executado apenas quando houver valor na variável -->
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/> <!-- v-show serve para mostrar o valor apenas quando ele existir. Neste caso, se url não estiver preenchido, ele não mostra nada.  -->
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link to="/">
          <meu-botao rotulo="VOLTAR" tipo="button"/>
        </router-link>
      </div> 
    </form>
  </div>

  <!--Atenção, no vue.js, para fazer databinding bidirecional, eu posso utilizar um atalho: ao invés de colocar @input="foto.titulo = $event.target.value" :value="foto.titulo, eu ponho apenas, v-model="foto.titulo". Assim ele insere um valor e transmite o valor da minha fonte de dados.  -->
</template>

<<script>
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto.js';

export default {
  components: {
    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
    return {
      foto: new Foto()
    }
  },

  methods: {
    grava() {
      this.resource
      .save(this.foto)
      .then(() => this.foto = new Foto(), err => console.log(err)); //se minha requisição for bem sucedida eu não recebo nada, e eu executo minha função que vai colocar uma foto nova (para limpar o formulário). Se der um erro eu vou logar no console o erro.
   }
  },

  //quando o componente é criado ele já executa o que tem dentro.
  created() {
    this.resource = this.$resource("v1/fotos");
  }
}
</script>

<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}
</style>
