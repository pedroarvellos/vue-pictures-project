<template>
    <div class="painel">
        <h2 class="painel-titulo">{{ titulo }}</h2>
        <slot class="painel-conteudo"> <!-- Quando eu coloco o slot, ele entende que tudo que estiver dentro dele, ele vai manter ao invés de trocar. Esta area chamada "slot" vai receber tudo que estiver dentro do "meu-painel"-->
        </slot>
    </div>
</template>

<script>
export default {
    props: ['titulo']
};
</script>

<!-- Quando eu escrevo scoped depois de style, isto significa que este estilo vai valer apenas para este componente que está sendo carregado. Neste caso, o painel. Por exemplo, eu aplico box-shadow universalmente no meu estilo a partir do *, porém ele aplicou este estilo apenas para o componente Painel, uma vez que eu coloquei scoped e restringi este estilo apenas para o componente Painel.-->   
<!-- É uma boa prática sempre que eu estilizar um componente eu colocar o scoped, para ele aplicar apenas ao elemento. Neste caso, se eu não colocasse escoped, o recarregar meu estilo no APP, este estilo afetará todos os componentes da página, pois ele é universal. Com o scoped, ele é universal apenas para este componente. -->
<style scoped> 
.painel {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

.painel .painel-titulo {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}

* {
    box-shadow: 5px 5px 5px black;
}
</style>
