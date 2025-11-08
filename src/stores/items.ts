import { defineStore } from 'pinia'
import fakeData from '@/data/fakeData.json'

export interface Item {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  stock: number
  especificaciones: Record<string, string>
}

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [...fakeData.items] as Item[],
  }),
  getters: {
    // Obtener item por ID
    getItemById: (state) => {
      return (id: number) => state.items.find((item) => item.id === id)
    },
    // Obtener total de items
    totalItems: (state) => state.items.length,
    // Obtener items por categoría
    getItemsByCategory: (state) => {
      return (categoria: string) => state.items.filter((item) => item.categoria === categoria)
    },
  },
  actions: {
    // Añadir un nuevo item
    addItem(item: Omit<Item, 'id'>) {
      const newId = this.items.length > 0 ? Math.max(...this.items.map((i) => i.id)) + 1 : 1
      this.items.push({
        ...item,
        id: newId,
      })
    },
    // Eliminar item por ID
    removeItem(itemId: number) {
      const index = this.items.findIndex((item) => item.id === itemId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },
    // Actualizar item existente
    updateItem(itemId: number, updatedItem: Partial<Item>) {
      const index = this.items.findIndex((item) => item.id === itemId)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updatedItem }
      }
    },
    // Cargar items iniciales (para resetear)
    loadInitialData() {
      this.items = [...fakeData.items] as Item[]
    },
  },
})
