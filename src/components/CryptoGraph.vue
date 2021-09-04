<template>
  <section class="relative">
    <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
      {{ heading }}
    </h3>
    <button type="button" class="absolute top-0 right-0" @click="onClose">
      <svg-icon name="close" class="w-7 h-7" />
    </button>
    <div
      ref="graph"
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

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    graph: {
      type: Array as PropType<Array<number>>,
      default: () => [],
    },
    graphbarWidth: {
      type: Number,
      required: false,
      default: 35,
    },
    heading: {
      type: String,
      required: false,
      default: 'Graph',
    },
  },

  emits: {
    'close-click': null,
  },

  data() {
    return {
      maxGraphLength: 1,
    }
  },

  computed: {
    normalizedGraph() {
      const maxValue = Math.max(...this.graph)
      const minValue = Math.min(...this.graph)
      if (minValue === maxValue) return new Array(this.graph.length).fill(50)
      return this.graph.map(
        (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue),
      )
    },

    slicedGraph() {
      return this.normalizedGraph.slice(-this.maxGraphLength)
    },
  },

  mounted() {
    this.calculateMaxGraphLength()
    window.addEventListener('resize', this.calculateMaxGraphLength)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.calculateMaxGraphLength)
  },

  methods: {
    // TODO need to throttle
    calculateMaxGraphLength() {
      if (!this.$refs.graph) {
        return
      }

      this.maxGraphLength = Math.ceil(
        (this.$refs.graph as HTMLElement).clientWidth / this.graphbarWidth,
      )
    },
    onClose() {
      this.$emit('close-click')
    },
  },
})
</script>
