import { createRouter, createWebHistory } from 'vue-router'


import Formulario from './components/Formulario/index.vue'
import Usuarios from './components/Usuarios.vue'


const routes = [
    //ruta raiz por defecto
  { path: '/', redirect: '/formulario' },
    //rutas activas de los componentes
  { path: '/formulario', component: Formulario },
  { path: '/usuarios', component: Usuarios },
  //rutas no definidas o existentes
  { path: '/:pathMatch(.*)*', redirect: '/formulario' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router