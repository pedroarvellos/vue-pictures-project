<template>
    <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado"> {{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2> <!-- O v-show mantém o elemento no DOM, o v-if remove o elemtno do DOM e coloca de novo. -->
    <h2 v-else class="centralizado">Incluindo</h2>
    <!--Aqui estou usando um databinding bidirecional, pois os dados fluem da view para a fonte de dados e da fonte de dados para a view. -->
    <form @submit.prevent="grava()"><!-- O comportamento padrão do formulário quando eu dou um submit é recarregar a página. Porém, não quero isto, pois eu tenho uma single page application. Sendo assim, eu preciso modificar o comportamento padrão do método para não recarregar (eu coloco .prevent, e ele cancela o comportamento padrão do meu formulário).-->
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <input name="titulo" data-vv-as="título 2" v-validate data-vv-rules="required|min:3|max:30" id="titulo" autocomplete="off" v-model.lazy="foto.titulo"> <!--Estou trazendo o valor digitado dentro de foto pois eu quero limpar o campo -->
        <span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span> <!-- Toda vez que faço minha validação usando o VeeValidate, quando há algum erro, ele coloca dentro de errors.has("aqui vem o name do meu formulário"). Este é o erro referente aquele form. -->
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input name="url" v-validate data-vv-rules="required" id="url" autocomplete="off" v-model.lazy="foto.url"> <!-- O .lazy faz com que o two way databinding seja executado apenas quando houver valor na variável -->
        <span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/> <!-- v-show serve para mostrar o valor apenas quando ele existir. Neste caso, se url não estiver preenchido, ele não mostra nada.  -->
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{name: 'home'}">
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
import FotoService from '../../domain/foto/FotoService';

export default {
  components: {
    'imagem-responsiva': ImagemResponsiva, 
    'meu-botao': Botao
  },

  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id //$route não é o mesmo que $router. $router é o cara que sabe tudo sobre navegação. $route é o cara que me dá o parâmetro da URL.
    }
  },

  methods: {
    grava() {
        this.$validator
        .validateAll() //Este cara vai varrer todas as minhas validações feitas e verificar se todas passaram ou não.<template>
        .then(success => { //se houve sucesso 
            if (success) {
              this.service
              .cadastra(this.foto)
             .then(() => {
                if(this.id) {
                  this.$router.push({ name: 'home'});
                  }
                   this.foto = new Foto()
              }, 
                err => console.log(err));
              }
            
        });
  }      
  },

  //quando o componente é criado ele já executa o que tem dentro.
  created() {
    this.service = new FotoService(this.$resource);
    
    if(this.id) {
      this.service
      .busca(this.id)
      .then(foto => this.foto = foto);
    }
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

.erro {
    color: red;
  }
</style>
