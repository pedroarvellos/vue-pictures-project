import Vue from 'vue';

Vue.directive('meu-transform', { //objeto passado como configuração da minha diretiva. 
    bind(el, binding, vnode) { //este método é chamado toda vez que a minha diretiva se prende no DOM, atua no DOM.
        let current = 0; //este é o valor padrão considerado pela minha diretiva para a minha imagem poder virar quando eu clicar duas vezes. 

        el.addEventListener('dblclick', function(){

            let incremento = binding.value || 90;

            if(binding.modifiers.reverse) { //Se ele tiver este modificador chamado reverse, ele entra aqui dentro.
                current -= incremento;
            } else {
                current += incremento;
            }
            
            el.style.transform = `rotate(${current}deg)`; //estou mudando diretamente o meu CSS via JavaScript. Estou usando template string do ES6.

            if(binding.modifiers.animate) {//Se ele tiver este modificador chamado animate, ele entra aqui dentro. Ele pode ter reverse e animate, neste caso entra nos dois. 
                el.style.transition = 'transform 0.5s';
            }
        });
    }

    //el: uma referência do DOM no qual a diretiva foi associada.
    //binding: quando eu mando um parâmetro pela diretiva, este é o binding. 
});