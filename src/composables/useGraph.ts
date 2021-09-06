import { ref, Ref, watch } from 'vue'

const MAX_GRAPH_LENGTH = 80

export default function useGraph() {
  const graph: Ref<number[]> = ref([])

  watch(graph, (value) => {
    if (value.length > MAX_GRAPH_LENGTH) {
      graph.value = value.slice(-MAX_GRAPH_LENGTH)
    }
  })

  return { graph }
}
