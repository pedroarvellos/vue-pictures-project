<template>
  <button v-on:click="disparaAcao()" class="botao" v-bind:class="estiloBotao" v-bind:type="tipo">{{ rotulo }}</button> <!-- No vue.js se eu coloco duas classes (uma com e outra sem bind), o vue incrementa os dois valores em uma class só. Fiz isto porque a clase botao é default para todos os botoes, entao é desnecessário eu ficar enviando do computed toda vez esta classe-->
</template>
<script>
export default {
  props: {
    tipo: {
      required: true,
      type: String
    },

    rotulo: {
      required: true,
      type: String
    },

    confirmacao: {
      required: false,
      default: false,
      type: Boolean
    },

    estilo: {
      required: false,
      default: "padrao",
      type: String
    }
  },

  methods: {
    disparaAcao() {
      if (this.confirmacao) {
        if (confirm("Confirma Operação?")) {
          this.$emit("botaoAtivado"); 
        }
        return;
      }
      this.$emit("botaoAtivado"); 
    }
  },

  computed: {
    estiloBotao() {
      if (this.estilo == "padrao" || !this.estilo) return "botao-padrao";
      if (this.estilo == "perigo") return "botao-perigo";
    }
  }
};
</script>
<style lang="sass">
  @import './Botao.scss';
</style>
