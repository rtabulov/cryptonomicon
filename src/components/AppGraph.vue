<template>
  <section class="relative">
    <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
      {{ heading }}
    </h3>
    <button type="button" class="absolute top-0 right-0" @click="emit('close')">
      <svg-icon name="close" class="w-7 h-7" />
    </button>
    <div
      ref="graphElement"
      class="flex items-end border-gray-600 border-b border-l h-64"
    >
      <div
        v-for="(bar, idx) in normalizedGraph"
        :key="idx"
        :style="{ height: `${bar}%`, width: `${graphbarWidth}px` }"
        class="bg-purple-800 border"
      ></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useGraph from '@/composables/useGraph'
import { PropType, Ref, ref, toRef } from 'vue'

// TODO finish graph module
const props = defineProps({
  graph: {
    type: Array as PropType<Array<number>>,
    default: () => [],
  },
  graphbarWidth: {
    type: Number,
    default: 35,
  },
  heading: {
    type: String,
    default: 'Graph',
  },
})

const emit = defineEmits<{ (e: 'close'): void }>()

const graphElement: Ref<HTMLElement | null> = ref(null)

const { normalizedGraph } = useGraph(
  toRef(props, 'graph'),
  graphElement,
  props.graphbarWidth,
)
</script>
