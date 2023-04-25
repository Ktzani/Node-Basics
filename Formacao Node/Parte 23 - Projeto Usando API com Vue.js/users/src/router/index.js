import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import WithSuccessView from '../views/WithSuccessView.vue'
import UsersView from '../views/UsersView.vue'
import RestricView from '../views/RestrictView'
import EditView from '../views/EditView.vue'

function adminAuthGuard(to, from, next){
	if (localStorage.getItem('token') != undefined){
		let req = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}		
		console.log(req)		
		axios.post("http://localhost:8686/validate", {}, req).then(res => {
			console.log(res)
			next()
		}).catch(err => {
			console.log(err.response)
			next("/restrict")
		})
	}	
	else{	
		next("/login")
	}
}

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
    path: '/register',
    name: 'register',
    component: RegisterView
  },

  {
    path: '/success',
    name: 'success',
    component: WithSuccessView
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  {
    path: '/admin/users',
    name: 'users',
    component: UsersView,
    
    // Guard -> são como middlewares que sao colocados para executar antes de acessar uma rota, e eles tem como objetivo proteger uma determinada rota
    // Como por exemplo: so deixe ele acessar essa rota se tiver o token ou so se for o admin   
    beforeEnter: adminAuthGuard
  
  },

  {
    path: '/admin/users/edit/:codigo',
    name: 'userEdit',
    component: EditView,   
    beforeEnter: adminAuthGuard
  },

  {
    path: "/restrict",
    name: "restrict",
    component: RestricView,
  }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
