<script setup lang="ts">
import type { FormProduct } from '@/models/Product'
import * as ProductApi from '@/api/product.api'
import { useToast } from 'vue-toast-notification'
import moment from 'moment'
import { ref, defineProps, watchEffect } from 'vue'
const props = defineProps<{
  isModalOpen: boolean
  product: FormProduct
  title: string
  type: 'add' | 'edit'
}>()

const emit = defineEmits(['close', 'update'])
const toast = useToast()

const productForm = ref<FormProduct>({
  name: '',
  description: '',
  price: 0,
  quantity: 0,
})
watchEffect(() => {
  productForm.value = { ...productForm.value, ...props.product }
})
const onSubmit = async () => {
  if (props.type === 'add') {
    delete productForm.value.id
    const total = productForm.value.price * productForm.value.quantity
    productForm.value.total = total
    productForm.value.date = moment(Date.now()).format('DD/MM/YYYY')
    await ProductApi.addProduct(productForm.value)
    toast.success('Product added')
  } else {
    if (productForm.value.id) {
      const total = productForm.value.price * productForm.value.quantity
      productForm.value.total = total
      productForm.value.date = moment(Date.now()).format('DD/MM/YYYY')
      await ProductApi.updateProduct(productForm.value.id, productForm.value)
      toast.success('Product updated')
    }
  }
  emit('close')
  emit('update')
}
</script>
<template>
  <transition name="fade">
    <div v-if="props.isModalOpen" :class="$style.overlay"></div>
  </transition>
  <transition name="slide-fade">
    <div v-if="props.isModalOpen" :class="$style.modalContainer">
      <div :class="$style.modal" ref="" role="dialog">
        <h2 :class="$style.formHeadline">{{ title }}</h2>
        <main>
          <form :class="$style.form" @submit.prevent="onSubmit">
            <div :class="$style.formRow">
              <label for="product">Product Name</label>
              <input
                v-model="productForm.name"
                placeholder="Product Name"
                type="text"
                name="product"
                id="product"
                autofocus
                required
                :class="$style.input"
              />
            </div>
            <div :class="$style.formRow">
              <label for="description">Description</label>
              <textarea
                v-model="productForm.description"
                type="text"
                name="description"
                placeholder="Description"
                id="description"
                class="w-100"
                :class="$style.textarea"
                required
              />
            </div>
            <div :class="$style.formRow">
              <label for="price">Price</label>
              <input
                v-model="productForm.price"
                placeholder="price"
                type="number"
                name="price"
                id="price"
                required
                :class="$style.input"
              />
            </div>
            <div :class="$style.formRow">
              <label for="quantity">Quantity</label>
              <input
                v-model="productForm.quantity"
                placeholder="quantity"
                type="number"
                name="quantity"
                id="quantity"
                required
                :class="$style.input"
              />
            </div>
            <div :class="$style.formActions">
              <button @click.prevent="$emit('close')" class="btn">Close</button>
              <button type="submit" class="btn btn-primary">Add</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(2rem);
  opacity: 0;
}

.btn-custom-close {
  color: #343a40;
  outline: none;
  border: 1px solid #343a40;
  padding: 10px;
  border-radius: 4px;
  font-weight: 700;
  width: 100px;
}
.btn-custom-add {
  color: #28a745;
  outline: none;
  border: 1px solid #28a745;
  padding: 10px;
  border-radius: 4px;
  font-weight: 700;
  width: 100px;
}
.btn-custom-add-disabled {
  color: #28a745;
  outline: none;
  border: 1px solid #28a745;
  padding: 10px;
  border-radius: 4px;
  font-weight: 700;
  width: 100px;
  opacity: 0.5;
}
.required-text {
  color: red !important;
  padding: 2px;
}
</style>

<style module>
.overlay {
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  inset: 0;
}

.modalContainer {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  z-index: 10;
  background-color: white;
  transform: translateY(-2rem);
}

.form {
  margin: 0;
}

.formHeadline {
  font-size: 1.6rem;
  margin-bottom: 2rem;
}

.formRow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.formRow label {
  margin-bottom: 0.5rem;
  display: block;
  width: 100%;
  text-align: left;
  flex-basis: 100%;
}

.formRow input {
  flex-basis: 100%;
  padding: 0.5rem 0.75rem;
}

.formActions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.input {
  padding: 8px 8px;
}

.textarea {
  padding: 4px 12px;
}
</style>
