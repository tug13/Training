<script setup lang="ts">
import DatatableVue from '../components/DatatableVue.vue'
import ProductModal from '@/components/ProductModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import * as ProductApi from '@/api/product.api'
import type { FormProduct, Product } from '@/models/Product'
import { ref, onMounted } from 'vue'
import _ from 'lodash'
const filteredData = ref<Product[]>([])
const searchInput = ref('')
const data = ref<Product[]>([])
const isModalOpen = ref(false)
const idToDelete = ref<number>(0)
const isModalConfirmOpen = ref(false)
const currentType = ref<'add' | 'edit'>('add')
const title = ref<'Add Product' | 'Edit Product'>('Add Product')
const initialProduct: FormProduct = {
  name: '',
  description: '',
  price: 0,
  quantity: 0,
}
const currentProduct = ref<FormProduct>(initialProduct)
const getProducts = async () => {
  const result = await ProductApi.getAllProucts()
  data.value = result.data
  filteredData.value = data.value
}

const onEdit = (item: FormProduct) => {
  title.value = 'Edit Product'
  isModalOpen.value = true
  currentType.value = 'edit'
  currentProduct.value = item
}
const onAdd = () => {
  title.value = 'Add Product'
  isModalOpen.value = true
  currentType.value = 'add'
  currentProduct.value = { ...initialProduct }
}
const onUpdate = () => {
  getProducts()
}

const onDelete = (id: number) => {
  idToDelete.value = id
  isModalConfirmOpen.value = true
}
const onSearch = _.debounce(async () => {
  if (searchInput.value !== '') {
    filteredData.value = [
      ...data.value.filter((product) => {
        const value = searchInput.value.toUpperCase()
        return (
          product.name.toUpperCase().indexOf(value) >= 0 ||
          product.description?.toUpperCase().indexOf(value) >= 0
        )
      }),
    ]
  } else {
    filteredData.value = [...data.value]
  }
}, 200)

onMounted(async () => {
  await getProducts()
})
</script>
<template>
  <h4>Products list</h4>
  <div class="content">
    <div class="d-flex buttonvue">
      <form class="form-inline d-flex gap-10">
        <input
          v-model="searchInput"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          @input="onSearch"
        />
        <button
          type="button"
          class="btn btn-outline-success my-2 my-sm-0"
          @click.prevent="onSearch"
        >
          Search
        </button>
      </form>
      <button @click="onAdd" type="button" class="btn btn-primary">Add</button>
    </div>
    <datatable-vue
      :data="filteredData"
      @edit="onEdit($event)"
      @delete="onDelete($event)"
    />
    <product-modal
      :product="currentProduct"
      :is-modal-open="isModalOpen"
      :title="title"
      :type="currentType"
      @close="isModalOpen = false"
      @update="onUpdate"
    />
    <confirm-modal
      :is-modal-confirm-open="isModalConfirmOpen"
      :title="'Are you sure to delete this product ?'"
      :id-to-delete="idToDelete"
      @close="isModalConfirmOpen = false"
      @update="onUpdate"
    />
  </div>
</template>

<style scoped lang="scss">
.gap-10 {
  gap: 5px;
}
.buttonvue {
  justify-content: space-between;
}
</style>
