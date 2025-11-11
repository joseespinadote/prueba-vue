import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import ItemList from './ItemList.vue'
import { useItemsStore } from '@/stores/items'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: ItemList
    },
    {
      path: '/item/:id',
      component: { template: 'Detail' }
    }
  ]
})

describe('ItemList', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('debe renderizar correctamente', () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('debe mostrar el título "Lista de Items"', () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    expect(wrapper.find('h2').text()).toBe('Lista de Items')
  })

  it('debe mostrar el total de items', () => {
    const store = useItemsStore()
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    expect(wrapper.text()).toContain(`Total de items: ${store.totalItems}`)
  })

  it('debe renderizar la tabla con items', () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
  })

  it('debe mostrar las columnas correctas en la tabla', () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const headers = wrapper.findAll('th')
    expect(headers[0].text()).toBe('ID')
    expect(headers[1].text()).toBe('Nombre')
    expect(headers[2].text()).toBe('Descripción')
    expect(headers[3].text()).toBe('Precio')
    expect(headers[4].text()).toBe('Categoría')
    expect(headers[5].text()).toBe('Stock')
    expect(headers[6].text()).toBe('Acciones')
  })

  it('debe renderizar filas de items', () => {
    const store = useItemsStore()
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(store.items.length)
  })

  it('debe mostrar el botón de añadir item', () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const addButton = wrapper.find('.add-button')
    expect(addButton.exists()).toBe(true)
    expect(addButton.text()).toBe('+ Añadir Item')
  })

  it('debe mostrar el formulario al hacer click en añadir', async () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    expect(wrapper.find('.add-form').exists()).toBe(false)

    const addButton = wrapper.find('.add-button')
    await addButton.trigger('click')

    expect(wrapper.find('.add-form').exists()).toBe(true)
    expect(wrapper.find('.add-form h3').text()).toBe('Añadir Nuevo Item')
  })

  it('debe cambiar el texto del botón cuando se muestra el formulario', async () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const addButton = wrapper.find('.add-button')
    expect(addButton.text()).toBe('+ Añadir Item')

    await addButton.trigger('click')
    expect(addButton.text()).toBe('Cancelar')
  })

  it('debe ocultar el formulario al cancelar', async () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const addButton = wrapper.find('.add-button')
    await addButton.trigger('click')

    expect(wrapper.find('.add-form').exists()).toBe(true)

    const cancelButton = wrapper.find('.cancel-button')
    await cancelButton.trigger('click')

    expect(wrapper.find('.add-form').exists()).toBe(false)
  })

  it('debe añadir un nuevo item al enviar el formulario', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useItemsStore()
    const initialCount = store.items.length

    // Mock de window.alert
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, pinia]
      }
    })

    const addButton = wrapper.find('.add-button')
    await addButton.trigger('click')

    // Llenar el formulario
    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('Nuevo Item de Prueba')
    await inputs[1].setValue('Categoría de Prueba')
    await inputs[2].setValue('99.99')
    await inputs[3].setValue('50')

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Descripción de prueba')

    const submitButton = wrapper.find('.submit-button')
    await submitButton.trigger('click')

    await wrapper.vm.$nextTick()

    expect(store.items.length).toBe(initialCount + 1)
    expect(window.alert).toHaveBeenCalled()

    vi.restoreAllMocks()
  })

  it('debe mostrar alerta si faltan campos obligatorios', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const addButton = wrapper.find('.add-button')
    await addButton.trigger('click')

    const submitButton = wrapper.find('.submit-button')
    await submitButton.trigger('click')

    expect(window.alert).toHaveBeenCalledWith('Por favor completa los campos obligatorios')

    vi.restoreAllMocks()
  })

  it('debe mostrar botón de eliminar para cada item', () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const deleteButtons = wrapper.findAll('.delete-button')
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('debe mostrar enlaces de detalle para cada item', () => {
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const detailLinks = wrapper.findAll('.detail-link')
    expect(detailLinks.length).toBeGreaterThan(0)
    expect(detailLinks[0].text()).toBe('Ver detalle')
  })

  it('debe formatear el precio correctamente', () => {
    const store = useItemsStore()
    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const firstItem = store.items[0]
    if (firstItem) {
      expect(wrapper.text()).toContain(`$${firstItem.precio.toFixed(2)}`)
    }
  })

  it('debe resetear el formulario después de añadir un item', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})

    const wrapper = mount(ItemList, {
      global: {
        plugins: [router, createPinia()]
      }
    })

    const addButton = wrapper.find('.add-button')
    await addButton.trigger('click')

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('Producto Temporal')
    await inputs[1].setValue('Categoría Temporal')
    await inputs[2].setValue('25.50')
    await inputs[3].setValue('100')

    const textarea = wrapper.find('textarea')
    await textarea.setValue('Descripción temporal')

    const submitButton = wrapper.find('.submit-button')
    await submitButton.trigger('click')

    // El formulario debe ocultarse después de añadir
    expect(wrapper.find('.add-form').exists()).toBe(false)

    vi.restoreAllMocks()
  })
})
