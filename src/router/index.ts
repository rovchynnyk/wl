import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:id',
      name: 'details',
      component: () => import('@/views/ProductDetailsView.vue'),
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('@/views/FavouritesView.vue'),
    }
  ]
})

export default router
