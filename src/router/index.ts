import { createRouter, createWebHistory } from 'vue-router'
import ItemList from '@/components/ItemList.vue'
import ItemDetail from '@/components/ItemDetail.vue'
import ProyectAbout from '@/components/ProjectAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ItemList,
    },
    {
      path: '/items',
      name: 'items',
      component: ItemList,
    },
    {
      path: '/item/:id',
      name: 'item-detail',
      component: ItemDetail,
    },
    {
      path: '/about',
      name: 'about',
      component: ProyectAbout,
    },
  ],
})

export default router
