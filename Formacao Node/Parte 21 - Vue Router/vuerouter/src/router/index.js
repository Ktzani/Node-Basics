import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CadastroView from '../views/CadastroView.vue'

//É nesse array array que eu defino todas minhas rotas
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/cadastro/:id',
    name: 'cadastro',
    component: CadastroView,

    //Nested Routes => Uma rota que está dentro da outra. Elas nao podem ter uma barra no inicio delas.
    children: [
      {
        path: 'catiza',
        name: 'Catiza',
        component: AboutView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
