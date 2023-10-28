import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import MatrixView from '../views/MatrixView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView 
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView 
    },
    {
      path: '/matrix',
      name: 'matrix',
      component: MatrixView 
    }
  ]
})

export default router
