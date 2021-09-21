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
        class="
          absolute
          left-1/2
          transform
          -translate-x-1/2
          top-0
          mt-1
          text-3xl
          font-semibold
          text-gray-900
        "
      >
        <span
          v-if="selectedElement || lastElement"
          :class="{ 'text-yellow-600 transition-colors': selectedElement }"
        >
          {{ `$${formatPrice(selectedElement || lastElement)}` }}
        </span>
      </div>
      <div
        v-for="({ normalized, original }, idx) in normalizedGraph"
        :key="original"
        :style="{ width: `${graphbarWidth}px` }"
        class="h-full flex items-end group border border-transparent"
        @pointerenter="selectedElement = original"
        @pointermove="selectedElement = original"
        @pointerleave="selectedElement = null"
      >
        <div
          :style="{ height: `${normalized}%` }"
          class="
            bg-purple-800
            group-hover:bg-yellow-600
            transition-colors
            w-full
          "
          :class="{
            'bg-yellow-600':
              idx === normalizedGraph.length - 1 && !selectedElement,
          }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useGraph from '@/composables/useGraph'
import { PropType, Ref, ref, toRef, computed } from 'vue'
import { last } from 'lodash-es'
import { formatPrice } from '@/utils'

const props = defineProps({
  graph: {
    type: Array as PropType<Array<number>>,
    default: () => [],
  },
  graphbarWidth: {
    type: Number,
    default: 25,
  },
  heading: {
    type: String,
    default: 'Graph',
  },
})

const emit = defineEmits<{ (e: 'close'): void }>()

const selectedElement = ref<number | null>(null)
const lastElement = computed(() => last(normalizedGraph.value)?.original)

const graphElement: Ref<HTMLElement | null> = ref(null)

const { normalizedGraph } = useGraph(
  toRef(props, 'graph'),
  graphElement,
  toRef(props, 'graphbarWidth'),
)
</script>
