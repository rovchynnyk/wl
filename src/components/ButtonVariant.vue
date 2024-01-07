<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const { variant } = defineProps<{ 
  variant: 'link' | 'button' | 'submit'
  url?: string,
}>();

const componentType = computed(() => {
  return variant === 'link' ? RouterLink : 'button';
});
</script>

<template>
  <component 
    :is="componentType" 
    :to="variant === 'link' ? url : undefined"
    class="button"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
.button {
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