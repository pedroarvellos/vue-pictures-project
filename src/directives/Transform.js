import Vue from 'vue';


export default { //objeto passado como configuração da minha diretiva. 
    bind(el, binding, vnode) { //este método é chamado toda vez que a minha diretiva se prende no DOM, atua no DOM.
        let current = 0; //este é o valor padrão considerado pela minha diretiva para a minha imagem poder virar quando eu clicar duas vezes. 

        el.addEventListener('dblclick', function(){

            let incremento = binding.value || 90; //se o parametro tiver vazio ele coloca 90 por default. 
            let efeito;

            if(!binding.arg || binding.arg == 'rotate') { //se o valor que está vindo estiver vazio ou se o valor for rotate, eu executo.
                if(binding.modifiers.reverse) { //Se ele tiver este modificador chamado reverse, ele entra aqui dentro.
                    current -= incremento;
                } else {
                    current += incremento;
                }

                efeito = `rotate(${current}deg)`//usando template string. 
            } else if (binding.arg == 'scale') {
                efeito = `scale(${incremento})`
            }

            el.style.transform = efeito; //estou mudando diretamente o meu CSS via JavaScript.

            if(binding.modifiers.animate) {//Se ele tiver este modificador chamado animate, ele entra aqui dentro. Ele pode ter reverse e animate, neste caso entra nos dois. 
                el.style.transition = 'transform 0.5s';
            }
        });
    }

    //el: uma referência do DOM no qual a diretiva foi associada.
    //binding: quando eu mando um parâmetro pela diretiva, este é o binding. 
}