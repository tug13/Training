<script setup lang="ts">
import type { Product } from '@/models/Product'

defineProps<{
  data: Product[]
}>()

defineEmits(['edit', 'delete'])
</script>
<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Date</th>
        <th scope="col">Total</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.total }}</td>
        <td class="gap-10">
          <button
            @click="$emit('edit', item)"
            type="button"
            class="btn btn-info"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            @click="$emit('delete', item.id)"
            type="button"
            class="btn btn-danger"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.gap-10 {
  display: flex;
  gap: 5px;
}
</style>
