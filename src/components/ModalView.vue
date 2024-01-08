<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid';

defineProps<{
  show: boolean,
  onModalClose: () => void,
}>();
</script>

<template>
  <div class="overlay" v-if="show">
    <div class="modal">
      <button @click="onModalClose" class="close-btn">
        <XMarkIcon />
      </button>

      <slot></slot>

      <footer class="actions">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 600px;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  padding: 24px;
  display: flex;
  align-items: self-end;
  justify-content: center;
}

.close-btn {
  margin-left: auto;
  border: none;
  background-color: #fff;
  color: #000;
  cursor: pointer;

  & > svg {
    width: 24px;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 1024px) {
  .overlay {
    align-items: center;
  }

  .actions {
    flex-direction: row;
  }
}
</style>