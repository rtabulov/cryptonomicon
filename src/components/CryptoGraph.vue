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
        v-for="(bar, idx) in slicedGraph"
        :key="idx"
        :style="{ height: `${bar}%`, width: `${graphbarWidth}px` }"
        class="bg-purple-800 border"
      ></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, PropType, Ref, ref } from 'vue'

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

const graphRef: Ref<HTMLElement | null> = ref(null)
const maxGraphLength = ref(1)

//   computed: {
const normalizedGraph = computed(() => {
  const maxValue = Math.max(...props.graph)
  const minValue = Math.min(...props.graph)
  if (minValue === maxValue) return new Array(props.graph.length).fill(50)
  return props.graph.map(
    (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue),
  )
})

const slicedGraph = computed(() =>
  normalizedGraph.value.slice(-maxGraphLength.value),
)

onMounted(() => {
  calculateMaxGraphLength()
  window.addEventListener('resize', calculateMaxGraphLength)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateMaxGraphLength)
})

// TODO need to throttle
function calculateMaxGraphLength() {
  if (!graphRef.value) {
    return
  }

  maxGraphLength.value = Math.ceil(
    graphRef.value.clientWidth / props.graphbarWidth,
  )
}

function onRef(el: unknown) {
  graphRef.value = el as HTMLElement
}
</script>
