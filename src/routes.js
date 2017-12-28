import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

export const routes = [
    { path: '', component: Home },//path em branco equivale a: localhost:3000/#/
    { path: '/cadastro', component: Cadastro }
];