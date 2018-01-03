import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

export const routes = [
    { path: '', component: Home, titulo: 'Home'},//path em branco equivale a: localhost:3000/#/, no meu main eu mudo para o endereço default ser sem '#'.
    { path: '/cadastro', component: Cadastro, titulo: 'Cadastro'}
];