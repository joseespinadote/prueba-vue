<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemsStore } from '@/stores/items'

const route = useRoute()
const router = useRouter()
const itemsStore = useItemsStore()

const itemId = computed(() => Number(route.params.id))
const item = computed(() => itemsStore.getItemById(itemId.value))

const goBack = () => {
  router.push('/')
}

const handleDelete = () => {
  if (item.value && confirm(`¿Estás seguro de eliminar "${item.value.nombre}"?`)) {
    itemsStore.removeItem(itemId.value)
    router.push('/')
  }
}
</script>

<template>
  <div class="item-detail">
    <div class="actions-header">
      <button @click="goBack" class="back-button">← Volver a la lista</button>
      <button v-if="item" @click="handleDelete" class="delete-button-header">
        🗑️ Eliminar Item
      </button>
    </div>

    <div v-if="item" class="detail-content">
      <h2>{{ item.nombre }}</h2>

      <div class="detail-section">
        <h3>Información General</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">ID:</span>
            <span class="value">{{ item.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">Categoría:</span>
            <span class="value">{{ item.categoria }}</span>
          </div>
          <div class="info-item">
            <span class="label">Precio:</span>
            <span class="value price">${{ item.precio.toFixed(2) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Stock:</span>
            <span class="value" :class="{ 'low-stock': item.stock < 20 }">
              {{ item.stock }} unidades
            </span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3>Descripción</h3>
        <p>{{ item.descripcion }}</p>
      </div>

      <div class="detail-section">
        <h3>Especificaciones Técnicas</h3>
        <div class="specs-grid">
          <div
            v-for="(value, key) in item.especificaciones"
            :key="key"
            class="spec-item"
          >
            <span class="spec-label">{{ key.replace(/_/g, ' ') }}:</span>
            <span class="spec-value">{{ value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h3>Item no encontrado</h3>
      <p>El item con ID {{ itemId }} no existe en la base de datos.</p>
    </div>
  </div>
</template>

<style scoped>
.item-detail {
  max-width: 900px;
  margin: 0 auto;
}

.actions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #35a372;
}

.delete-button-header {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s;
}

.delete-button-header:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

.detail-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.detail-section {
  margin-bottom: 30px;
}

.detail-section h3 {
  color: #42b983;
  margin-bottom: 15px;
  font-size: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.info-item {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid #42b983;
}

.label {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 8px;
}

.value {
  color: #555;
}

.price {
  color: #42b983;
  font-weight: bold;
  font-size: 18px;
}

.low-stock {
  color: #e74c3c;
  font-weight: bold;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}

.spec-item {
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.spec-label {
  font-weight: bold;
  color: #2c3e50;
  text-transform: capitalize;
}

.spec-value {
  color: #555;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.not-found h3 {
  color: #e74c3c;
  margin-bottom: 10px;
}

.not-found p {
  color: #555;
}
</style>
