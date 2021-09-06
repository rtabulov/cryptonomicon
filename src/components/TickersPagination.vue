<template>
  <div class="space-x-4 my-4">
    <app-button v-if="showPrev" @click="emit('prev')"> Назад </app-button>
    <app-button v-if="showNext" @click="$emit('next')"> Вперед </app-button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ showPrev: boolean; showNext: boolean }>()
const emit = defineEmits<{ (e: 'prev'): void; (e: 'next'): void }>()
</script>
