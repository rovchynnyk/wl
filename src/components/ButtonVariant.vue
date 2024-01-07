<script setup lang="ts">
defineProps<{ type: 'button' | 'submit' }>();
</script>

<template>
  <button :type="type">
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  border-radius: 8px;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #fff;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #4338ca; /* hover:bg-indigo-700 */
  }
}
</style>