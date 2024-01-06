<script setup lang="ts">
import { useRoute } from 'vue-router';

const { params: { id } } = useRoute();
</script>

<template>
  <div>hello {{ id }}</div>
</template>
