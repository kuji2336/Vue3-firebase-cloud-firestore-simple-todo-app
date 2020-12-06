import { createWebHistory, createRouter } from "vue-router";
import inputArea from '../components/InputArea'

const routes = [
  {path: '/', component:inputArea},
  {path: '/register', component:()=>import(/* webpackChunkName: "register" */ '../components/Register.vue')},
  {path: '/LogIn', component:()=>import(/* webpackChunkName: "register" */ '../components/LogIn.vue')}
]

const router = createRouter({
 history:createWebHistory(),
 routes
})

export default router