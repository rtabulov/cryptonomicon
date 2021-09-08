<template>
  <section class="relative">
    <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
      {{ heading }}
    </h3>
    <button type="button" class="absolute top-0 right-0" @click="emit('close')">
      <svg-icon name="close" class="w-7 h-7" />
    </button>
    <div
      :ref="onRef"
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
import { throttle } from 'lodash'
import { computed, onBeforeUnmount, onMounted, PropType, Ref, ref } from 'vue'

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

const emit = defineEmits({ close: null })

const graphElement: Ref<HTMLElement | null> = ref(null)
const maxGraphLength = ref(1)

const slicedGraph = computed(() => props.graph.slice(-maxGraphLength.value))

const normalizedGraph = computed(() => {
  const maxValue = Math.max(...slicedGraph.value)
  const minValue = Math.min(...slicedGraph.value)
  if (minValue === maxValue) return new Array(slicedGraph.value.length).fill(50)
  return slicedGraph.value.map(
    (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue),
  )
})

onMounted(() => {
  calculateMaxGraphLength()
  window.addEventListener('resize', calculateMaxGraphLength)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateMaxGraphLength)
})

// TODO need to throttle
const calculateMaxGraphLength = throttle(() => {
  if (!graphElement.value) {
    return
  }

  maxGraphLength.value = Math.ceil(
    graphElement.value.clientWidth / props.graphbarWidth,
  )
}, 300)

function onRef(el: unknown) {
  graphElement.value = el as HTMLElement
}
</script>
