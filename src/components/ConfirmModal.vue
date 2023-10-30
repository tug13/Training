<script setup lang="ts">
import { deleteProduct } from '@/api/product.api'
import { useToast } from 'vue-toast-notification'
import { useI18n } from 'vue-i18n'
import type { Message } from '@/i18n'
const { t } = useI18n<{ message: Message }, 'en' | 'fr'>()
const props = defineProps<{
  isModalConfirmOpen: boolean
  idToDelete: number
  title: string
}>()

const toast = useToast()
const emit = defineEmits(['close', 'update'])
const onDelete = async () => {
  if (props.idToDelete !== 0) {
    await deleteProduct(props.idToDelete)
    toast.success('Product deleted')
  }
  emit('update')
  emit('close')
}
</script>
<template>
  <transition name="fade">
    <div v-if="props.isModalConfirmOpen" :class="$style.overlay"></div>
  </transition>
  <transition name="slide-fade">
    <div v-if="props.isModalConfirmOpen" :class="$style.modalContainer">
      <div :class="$style.modal" ref="" role="dialog">
        <h2 :class="$style.formHeadline">{{ title }}</h2>
        <main>
          <div class="d-flex justify-content-end gap-10">
            <button @click.prevent="$emit('close')" class="btn btn-secondary">
              {{ t('confirmButton.no') }}
            </button>
            <button @click.prevent="onDelete" class="btn btn-danger">
              {{ t('confirmButton.yes') }}
            </button>
          </div>
        </main>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.gap-10 {
  gap: 5px;
}
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
