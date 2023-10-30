<script setup lang="ts">
import type { Product } from '@/models/Product'
import { useI18n } from 'vue-i18n'
import type { Message } from '@/i18n'
const { t } = useI18n<{ message: Message }, 'en' | 'fr'>()
defineProps<{
  data: Product[]
}>()

defineEmits(['edit', 'delete'])
</script>
<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">{{ t('table.name') }}</th>
        <th scope="col">{{ t('table.description') }}</th>
        <th scope="col">{{ t('table.price') }}</th>
        <th scope="col">{{ t('table.quantity') }}</th>
        <th scope="col">{{ t('table.date') }}</th>
        <th scope="col">{{ t('table.total') }}</th>
        <th scope="col">{{ t('table.action') }}</th>
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
