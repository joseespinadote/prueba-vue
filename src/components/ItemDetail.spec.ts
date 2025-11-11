import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import ItemDetail from './ItemDetail.vue'
import { useItemsStore } from '@/stores/items'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: { template: 'Home' }
    },
    {
      path: '/item/:id',
      component: ItemDetail
    }
  ]
})

describe('ItemDetail', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe renderizar correctamente', async () => {
    const store = useItemsStore()
    const firstItemId = store.items[0]?.id

    if (firstItemId) {
      await router.push(`/item/${firstItemId}`)
      await router.isReady()

      const wrapper = mount(ItemDetail, {
        global: {
          plugins: [router, createPinia()]
        }
      })

      expect(wrapper.exists()).toBe(true)
    }
  })

  it('debe mostrar detalles del item cuando existe', async () => {
    const store = useItemsStore()
    const item = store.items[0]

    if (item) {
      await router.push(`/item/${item.id}`)
      await router.isReady()

      const wrapper = mount(ItemDetail, {
        global: {
          plugins: [router, createPinia()]
        }
      })

      expect(wrapper.find('h2').text()).toBe(item.nombre)
      expect(wrapper.text()).toContain(item.descripcion)
      expect(wrapper.text()).toContain(item.categoria)
      expect(wrapper.text()).toContain(`$${item.precio.toFixed(2)}`)
    }
  })

  it('debe mostrar mensaje cuando el item no existe', async () => {
    await router.push('/item/99999')
    await router.isReady()

    const wrapper = mount(ItemDetail, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    expect(wrapper.text()).toContain('Item no encontrado')
    expect(wrapper.text()).toContain('no existe en la base de datos')
  })

  it('debe mostrar botón de volver', async () => {
    const store = useItemsStore()
    const firstItemId = store.items[0]?.id

    if (firstItemId) {
      await router.push(`/item/${firstItemId}`)
      await router.isReady()

      const wrapper = mount(ItemDetail, {
        global: {
          plugins: [router, createPinia()]
        }
      })

      const backButton = wrapper.find('.back-button')
      expect(backButton.exists()).toBe(true)
      expect(backButton.text()).toContain('Volver a la lista')
    }
  })

  it('debe llamar a router.push al hacer click en volver', async () => {
    const store = useItemsStore()
    const firstItemId = store.items[0]?.id

    if (firstItemId) {
      await router.push(`/item/${firstItemId}`)
      await router.isReady()

      const wrapper = mount(ItemDetail, {
        global: {
          plugins: [router, createPinia()]
        }
      })

      const pushSpy = vi.spyOn(router, 'push')
      const backButton = wrapper.find('.back-button')
      await backButton.trigger('click')

      expect(pushSpy).toHaveBeenCalledWith('/')
    }
  })

  it('debe mostrar clase low-stock cuando el stock es bajo', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useItemsStore()

    // Crear un item con stock bajo
    store.addItem({
      nombre: 'Item con stock bajo',
      descripcion: 'Test',
      precio: 10,
      categoria: 'Test',
      stock: 5,
      especificaciones: {}
    })

    const lowStockItem = store.items[store.items.length - 1]

    await router.push(`/item/${lowStockItem.id}`)
    await router.isReady()

    const wrapper = mount(ItemDetail, {
      global: {
        plugins: [router, pinia]
      }
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.low-stock').exists()).toBe(true)
  })

  it('debe mostrar el botón de eliminar cuando existe el item', async () => {
    const store = useItemsStore()
    const firstItemId = store.items[0]?.id

    if (firstItemId) {
      await router.push(`/item/${firstItemId}`)
      await router.isReady()

      const wrapper = mount(ItemDetail, {
        global: {
          plugins: [router, createPinia()]
        }
      })

      const deleteButton = wrapper.find('.delete-button-header')
      expect(deleteButton.exists()).toBe(true)
    }
  })
})
