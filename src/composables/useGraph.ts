import { ref, Ref, watch } from 'vue'

const MAX_GRAPH_LENGTH = 80

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useGraph(maxLength = MAX_GRAPH_LENGTH) {
  const graph: Ref<number[]> = ref([])

  watch(graph, (value) => {
    if (value.length > maxLength) {
      graph.value = value.slice(-maxLength)
    }
  })

  return { graph }
}
