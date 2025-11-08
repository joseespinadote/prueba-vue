<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useItemsStore } from '@/stores/items'

const itemsStore = useItemsStore()
const items = computed(() => itemsStore.items)
const totalItems = computed(() => itemsStore.totalItems)

const showAddForm = ref(false)
const newItem = ref({
  nombre: '',
  descripcion: '',
  precio: 0,
  categoria: '',
  stock: 0,
  especificaciones: {} as Record<string, string>,
})

const handleDelete = (itemId: number, itemName: string) => {
  if (confirm(`¿Estás seguro de eliminar "${itemName}"?`)) {
    itemsStore.removeItem(itemId)
  }
}

const toggleAddForm = () => {
  showAddForm.value = !showAddForm.value
  if (!showAddForm.value) {
    resetForm()
  }
}

const resetForm = () => {
  newItem.value = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    stock: 0,
    especificaciones: {},
  }
}

const handleAddItem = () => {
  if (!newItem.value.nombre || !newItem.value.descripcion) {
    alert('Por favor completa los campos obligatorios')
    return
  }

  itemsStore.addItem({ ...newItem.value })
  alert(`Item "${newItem.value.nombre}" añadido correctamente`)
  resetForm()
  showAddForm.value = false
}
</script>

<template>
  <div>
    <div class="header">
      <div>
        <h2>Lista de Items</h2>
        <p class="total-items">Total de items: {{ totalItems }}</p>
      </div>
      <button @click="toggleAddForm" class="add-button">
        {{ showAddForm ? 'Cancelar' : '+ Añadir Item' }}
      </button>
    </div>

    <!-- Formulario para añadir item -->
    <div v-if="showAddForm" class="add-form">
      <h3>Añadir Nuevo Item</h3>
      <div class="form-grid">
        <div class="form-group">
          <label>Nombre *</label>
          <input v-model="newItem.nombre" type="text" placeholder="Nombre del producto" />
        </div>
        <div class="form-group">
          <label>Categoría *</label>
          <input v-model="newItem.categoria" type="text" placeholder="Ej: Electrónica" />
        </div>
        <div class="form-group">
          <label>Precio *</label>
          <input v-model.number="newItem.precio" type="number" step="0.01" placeholder="0.00" />
        </div>
        <div class="form-group">
          <label>Stock *</label>
          <input v-model.number="newItem.stock" type="number" placeholder="0" />
        </div>
        <div class="form-group full-width">
          <label>Descripción *</label>
          <textarea
            v-model="newItem.descripcion"
            placeholder="Descripción del producto"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="form-actions">
        <button @click="handleAddItem" class="submit-button">Guardar Item</button>
        <button @click="toggleAddForm" class="cancel-button">Cancelar</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.descripcion }}</td>
          <td>${{ item.precio.toFixed(2) }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.stock }}</td>
          <td class="actions-cell">
            <RouterLink :to="`/item/${item.id}`" class="detail-link"> Ver detalle </RouterLink>
            <button @click="handleDelete(item.id, item.nombre)" class="delete-button">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 5px;
  color: #2c3e50;
}

.total-items {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.add-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s;
}

.add-button:hover {
  background-color: #35a372;
  transform: translateY(-2px);
}

.add-form {
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 25px;
  border: 2px solid #42b983;
}

.add-form h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #2c3e50;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.form-actions {
  display: flex;
  gap: 10px;
}

.submit-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.submit-button:hover {
  background-color: #35a372;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.cancel-button:hover {
  background-color: #c0392b;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #42b983;
  color: white;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: bold;
}

td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover {
  background-color: #f5f5f5;
}

.actions-cell {
  display: flex;
  gap: 8px;
  align-items: center;
}

.detail-link {
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border: 1px solid #42b983;
  border-radius: 4px;
  transition: all 0.3s;
  display: inline-block;
}

.detail-link:hover {
  background-color: #42b983;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  transition: all 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}
</style>
