// const Cadastro = resolve => require(['./components/cadastro/Cadastro.vue'], m => resolve(m.default)); //import assincrono.
import Cadastro from './components/cadastro/Cadastro.vue';
import Home from './components/home/Home.vue';

export const routes = [
    { path: '', name: 'home', component: Home, titulo: 'Home', menu: true},
    { path: '/cadastro', name:'cadastro', component: Cadastro, titulo: 'Cadastro', menu: true },
    { path: '/cadastro/:id', name:'altera', component: Cadastro, titulo: 'Cadastro', menu: false},//Se eu colocar /Cadastro/:id ele vai cair nessa rota. Porém no chamador, o params precisa ter o mesmo nome. 
    { path: '*', component: Home, menu: false } //qualquer rota diferente destas, vai para home. 
];