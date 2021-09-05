<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
