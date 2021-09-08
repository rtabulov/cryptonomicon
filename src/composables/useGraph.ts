import { throttle } from 'lodash'
import {
  ref,
  isRef,
  Ref,
  watch,
  computed,
  unref,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { MaybeRef } from './useLocalStorage'

const MAX_GRAPH_LENGTH = 256

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useGraph(
  items: MaybeRef<number[]>,
  elementRef: Ref<HTMLElement | null>,
  graphbarWidth: MaybeRef<number> = 35,
) {
  const maxLength = ref(MAX_GRAPH_LENGTH)

  if (isRef(items)) {
    watch(
      items,
      (value) => {
        if (value.length > MAX_GRAPH_LENGTH) {
          items.value = value.slice(-MAX_GRAPH_LENGTH)
        }
      },
      { deep: true },
    )
  }

  const slicedItems = computed(() => unref(items).slice(-unref(maxLength)))

  const max = computed(() => Math.max(...slicedItems.value))
  const min = computed(() => Math.min(...slicedItems.value))

  const normalizedGraph = computed(() => {
    if (min.value === max.value)
      return new Array(slicedItems.value.length).fill(50)

    return slicedItems.value.map((price) =>
      normalizeFunc(price, min.value, max.value),
    )
  })

  const recalculateMaxGraphLength = throttle(() => {
    if (!elementRef.value) {
      return
    }

    if (isRef(maxLength)) {
      maxLength.value = Math.ceil(
        elementRef.value.clientWidth / unref(graphbarWidth),
      )
    }
  }, 300)

  onMounted(() => {
    recalculateMaxGraphLength()
    window.addEventListener('resize', recalculateMaxGraphLength)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', recalculateMaxGraphLength)
  })

  return { items, slicedItems, normalizedGraph }
}

function normalizeFunc(num: number, min: number, max: number) {
  return 5 + ((num - min) * 95) / (max - min)
}
