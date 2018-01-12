<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    
    <p class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input = "filtro = $event.target.value" placeholder="filtre pelo título"/> <!-- Toda vez que o evento este evento v-on:input é disparado, ele executa da seguinte forma: pega filtro que é uma variável declarada dentro do meu data, e ele vai receber $event (objeto do vue.js), .target significa que é quem disparou o evento, e o value é o valor inserido. Resumindo, quando este evento é disparado, é colocado dentro do filtro o que está sendo digitado dinamicamente. Toda vez que estou digitando ele vai rodando este evento.-->
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComfiltro" :key="foto.url">
          <!-- Quando ele chega aqui, ele percebe que deve trocar esta notação pelo Painel que foi declarado (meu-painel, foi declarado em components como um "apelido" para Painel). Como ele vai trocar esta tag pelo tag Painel, tudo que tiver aqui dentro, ao menos que exita um "slot", será descartado. -->
          <meu-painel v-bind:titulo="foto.titulo">
            <imagem-responsiva v-meu-transform:scale.animate="1.1" v-bind:url="foto.url" v-bind:titulo="foto.titulo"/>  
            <meu-botao tipo="button" rotulo="REMOVER" :confirmacao= "true" estilo="perigo" v-on:botaoAtivado="remover(foto)"/> <!-- Atenção, não estou fazendo data binding aqui, estou passando direto a STRING com o botao para os parametros mencionados-->
            <!--Por que este .native? Não tem nenhuma especificação dentro do meu componente Botao.vue de um evento disparado, por isto, não adianta eu simplesmente escrever @click ou v-onclick, sendo assim, eu forço ele a executar este evento mesmo sem especificá-lo no componente. -->
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

  methods: {
    remover(foto) {
      // this.$http.delete('v1/fotos/' + foto._id)//fotos da API dele tem _id como padrão.

      this.resource
        .delete({ id: foto._id }) //neste caso eu uso uma requisição utilizando o método dele e uso como parâmetro o ID desta foto.
        .then(
          () => {
            let indice = this.fotos.indexOf(foto); //estou pegando a posição da minha foto no meu índice de fotos e em baixo removendo. Não tem necessidade de eu fazer mais uma requisição aqui e ir na API pegar dados, quanto mais eu evitar isto, melhor. Então vale a pena eu apenas remover da lista.
            this.fotos.splice(indice, 1);
            this.mensagem = "Foto removida com sucesso";
          },
          err => {
            //repare, neste caso da arrow function, eu abri um bloco (chaves), isto porque minha segunda função tem duas instruções.
            console.log(err);
            this.mensagem = "Não foi possível remover foto";
          }
        );
    }
  },

  //O método created é executado assim que meu componente é criado. Então neste caso, ele já executa o query para trazer as imagens e cria o meu componente resource para utilizar neste componente pelos outros métodos resource http.
  created() {
    this.resource = this.$resource("v1/fotos{/id}"); ///id é um parâmetro do meu recurso. Ele roda este parâmetro só quando for chamado, como é chamado no id, por exemplo. O nome do parâmetro no DELETE, o parâmetro é chamado com seu nome, isto é, id.
    this.resource
      .query() //query aqui equivale a uma requisição utilizando o método GET para este endereço do resurce. resource.query() é o GET.
      .then(res => res.json()) //Então eu chamo a função THEN, e digo que ele ele vai me devolver a resposta que veio do servidor (res), e digo para ele converter esta resposta para json. Ele apenas transforma os dados retornados em json.
      .then(
        minhaListaDeFotos => {
          this.fotos = minhaListaDeFotos;
        },
        err => console.log(err)
      );
    // //exemplo sem usar arrow function
    // .then(function (res) {
    // return res.json()})
    // .then(function (minhaListaDeFotos) {
    //   this.fotos = minhaListaDeFotos
    // }), function (err) {
    //   console.log(err)
    // }
    //eu pego a minha lista de fotos que vem da minha promise (que agora foi transformada em json), e digo que a minha lista de fotos do meu compomente data vai receber as fotos que estão vindo do servidor.
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
