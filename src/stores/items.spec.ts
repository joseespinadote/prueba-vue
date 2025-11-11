import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useItemsStore } from './items'

describe('useItemsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('getters', () => {
    it('debe retornar el número total de items', () => {
      const store = useItemsStore()
      expect(store.totalItems).toBeGreaterThan(0)
    })

    it('debe obtener un item por ID', () => {
      const store = useItemsStore()
      const firstItemId = store.items[0]?.id

      if (firstItemId) {
        const item = store.getItemById(firstItemId)
        expect(item).toBeDefined()
        expect(item?.id).toBe(firstItemId)
      }
    })

    it('debe retornar undefined para un ID inexistente', () => {
      const store = useItemsStore()
      const item = store.getItemById(99999)
      expect(item).toBeUndefined()
    })

    it('debe obtener items por categoría', () => {
      const store = useItemsStore()
      if (store.items.length > 0) {
        const categoria = store.items[0].categoria
        const items = store.getItemsByCategory(categoria)
        expect(items.length).toBeGreaterThan(0)
        items.forEach(item => {
          expect(item.categoria).toBe(categoria)
        })
      }
    })
  })

  describe('actions', () => {
    it('debe añadir un nuevo item', () => {
      const store = useItemsStore()
      const initialCount = store.items.length

      const newItem = {
        nombre: 'Test Item',
        descripcion: 'Descripción de prueba',
        precio: 99.99,
        categoria: 'Test',
        stock: 10,
        especificaciones: { test: 'value' }
      }

      store.addItem(newItem)

      expect(store.items.length).toBe(initialCount + 1)
      expect(store.items[store.items.length - 1].nombre).toBe('Test Item')
      expect(store.items[store.items.length - 1].id).toBeDefined()
    })

    it('debe generar IDs únicos al añadir items', () => {
      const store = useItemsStore()

      const item1 = {
        nombre: 'Item 1',
        descripcion: 'Desc 1',
        precio: 10,
        categoria: 'Cat1',
        stock: 5,
        especificaciones: {}
      }

      const item2 = {
        nombre: 'Item 2',
        descripcion: 'Desc 2',
        precio: 20,
        categoria: 'Cat2',
        stock: 3,
        especificaciones: {}
      }

      store.addItem(item1)
      const id1 = store.items[store.items.length - 1].id

      store.addItem(item2)
      const id2 = store.items[store.items.length - 1].id

      expect(id1).not.toBe(id2)
    })

    it('debe eliminar un item por ID', () => {
      const store = useItemsStore()
      const initialCount = store.items.length

      if (store.items.length > 0) {
        const itemIdToRemove = store.items[0].id
        store.removeItem(itemIdToRemove)

        expect(store.items.length).toBe(initialCount - 1)
        expect(store.getItemById(itemIdToRemove)).toBeUndefined()
      }
    })

    it('no debe hacer nada al intentar eliminar un item inexistente', () => {
      const store = useItemsStore()
      const initialCount = store.items.length

      store.removeItem(99999)

      expect(store.items.length).toBe(initialCount)
    })

    it('debe actualizar un item existente', () => {
      const store = useItemsStore()

      if (store.items.length > 0) {
        const itemId = store.items[0].id
        const updatedData = {
          nombre: 'Nombre Actualizado',
          precio: 199.99
        }

        store.updateItem(itemId, updatedData)

        const updatedItem = store.getItemById(itemId)
        expect(updatedItem?.nombre).toBe('Nombre Actualizado')
        expect(updatedItem?.precio).toBe(199.99)
      }
    })

    it('no debe hacer nada al actualizar un item inexistente', () => {
      const store = useItemsStore()
      const initialItems = [...store.items]

      store.updateItem(99999, { nombre: 'Test' })

      expect(store.items).toEqual(initialItems)
    })

    it('debe cargar datos iniciales', () => {
      const store = useItemsStore()
      const initialCount = store.items.length

      // Añadir un item
      store.addItem({
        nombre: 'Temporal',
        descripcion: 'Desc',
        precio: 10,
        categoria: 'Cat',
        stock: 5,
        especificaciones: {}
      })

      expect(store.items.length).toBe(initialCount + 1)

      // Cargar datos iniciales debe resetear
      store.loadInitialData()

      expect(store.items.length).toBe(initialCount)
    })
  })
})
