<template>
  <label>Поиск</label>
  <app-input
    v-model="filter"
    type="text"
    class="mt-2"
    placeholder="например DOGE"
  />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const emit = defineEmits<{ (e: 'change', value: string): void }>()

const filter = ref('')
watch(filter, (val) => {
  filter.value = val.toUpperCase()
  emit('change', filter.value)
})
</script>
