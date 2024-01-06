<script setup lang="ts">
import { inject, Ref } from 'vue';

const { show, closeModal } = inject<{ show: Ref<boolean>, closeModal: () => void }>('modal');

</script>

<template>
  <div class="overlay" v-show="show">
    <div class="modal">
      <span class="close" @click="closeModal">&times;</span>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal {
  background-color: white;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  width: 80%;
}
</style>